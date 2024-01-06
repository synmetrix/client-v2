import { Input, Space, Typography } from "antd";
import { useResponsive } from "ahooks";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import Button from "@/components/Button";
import Select from "@/components/Select";
import type { Branch } from "@/types/dataSource";
import { Branch_Statuses_Enum } from "@/graphql/generated";

import BranchGreyIcon from "@/assets/branch.svg";
import BranchBlackIcon from "@/assets/branch-black.svg";
import BranchColoredIcon from "@/assets/branch-colored.svg";
import TrashColoredIcon from "@/assets/trash-colored.svg";

import styles from "./index.module.less";

const { Paragraph } = Typography;

interface BranchSelectionProps {
  branches: Branch[];
  currentBranch?: Branch;
  disableActions?: boolean;
  onChangeBranch: (branchId: string) => void;
  onCreateBranch?: (name: string) => void;
  onSetDefault?: (branchId: string) => void;
  onDeleteBranch?: (branchId: string) => void;
}

const BranchSelection: React.FC<BranchSelectionProps> = ({
  branches,
  currentBranch,
  disableActions,
  onChangeBranch,
  onCreateBranch,
  onSetDefault,
  onDeleteBranch,
}) => {
  const { t } = useTranslation(["models", "common"]);

  const [newBranchName, setNewBranchName] = useState<string>("");

  const windowSize = useResponsive();
  const isMobile = windowSize.md === false;

  const onDefault = (e: any, branchId: string) => {
    e.stopPropagation();
    onSetDefault?.(branchId);
  };

  const onDelete = (e: any, branchId: string) => {
    e.stopPropagation();
    onDeleteBranch?.(branchId);
  };

  return (
    <div className={styles.wrapper}>
      <BranchColoredIcon />
      <Select
        className={cn(styles.select, isMobile && styles.selectMobile)}
        placeholder={t("common:words.select_branch")}
        size="middle"
        defaultValue={currentBranch?.id}
        value={currentBranch?.id}
        optionLabelProp="valueLabel"
        suffixIcon={<DownOutlined />}
        options={branches.map((b) => ({
          value: b.id,
          label:
            b.status === Branch_Statuses_Enum.Active
              ? b.name + " - default"
              : b.name,
          status: b.status,
        }))}
        optionRender={(props) => {
          const isDefault = props.data?.status === Branch_Statuses_Enum.Active;
          const isActive = props.value === currentBranch?.id;
          const icon = isActive ? <BranchBlackIcon /> : <BranchGreyIcon />;

          const label = (
            <div className={styles.label}>
              <span className={styles.icon}>{icon}</span>
              <Paragraph
                title={props.label as string}
                ellipsis
                className={styles.paragraph}
              >
                {props.label}
              </Paragraph>
            </div>
          );

          if (disableActions) {
            return label;
          }

          return (
            <div className={styles.container}>
              {label}
              {!isDefault && (
                <Space size={6} className={styles.actions}>
                  <Button
                    size="small"
                    type="text"
                    className={styles.button}
                    onClick={(e) => onDefault(e, props.value as string)}
                  >
                    {t("models:sidebar.set_default").toUpperCase()}
                  </Button>
                  <Button
                    size="small"
                    type="text"
                    className={styles.button}
                    onClick={(e) => onDelete?.(e, props.value as string)}
                  >
                    <TrashColoredIcon />
                  </Button>
                </Space>
              )}
            </div>
          );
        }}
        defaultOpen
        placement="bottomRight"
        popupClassName={styles.popup}
        onChange={onChangeBranch}
        disabled={!branches?.length}
        dropdownRender={(menu) => (
          <div>
            {menu}
            {!disableActions && (
              <Space>
                <Input
                  maxLength={20}
                  value={newBranchName}
                  className={styles.input}
                  placeholder="Main"
                  onChange={(e) => setNewBranchName(e.target.value)}
                />
                <Button
                  size="small"
                  type="text"
                  className={cn(styles.button, styles.plusButton)}
                  onClick={() => {
                    onCreateBranch?.(newBranchName);
                    setNewBranchName("");
                  }}
                >
                  <PlusOutlined />
                </Button>
              </Space>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default BranchSelection;
