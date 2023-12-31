import { Input } from "antd";
import { useResponsive } from "ahooks";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import Select from "@/components/Select";
import PopoverButton from "@/components/PopoverButton";

import BranchIcon from "@/assets/branch-colored.svg";
import VerticalDots from "@/assets/dots-vertical.svg";

import styles from "./index.module.less";

interface BranchSelectionProps {
  branchMenu?: any;
  branches: any[];
  currentBranch: any;
  disableCreate?: boolean;
  onChangeBranch: (id: string) => void;
  onCreateBranch?: (name: string) => void;
}

const BranchSelection: React.FC<BranchSelectionProps> = ({
  branchMenu,
  branches,
  currentBranch,
  disableCreate,
  onChangeBranch,
  onCreateBranch,
}) => {
  const { t } = useTranslation(["common"]);

  const [newBranchName, setNewBranchName] = useState<string>("");

  const windowSize = useResponsive();
  const isMobile = windowSize.md === false;

  return (
    <div className={styles.wrapper}>
      <BranchIcon />
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
          label: b.status === "active" ? b.name + " - default" : b.name,
        }))}
        onChange={onChangeBranch}
        disabled={!branches?.length}
        dropdownRender={(menu) => (
          <>
            {menu}
            {!disableCreate && (
              <Input
                value={newBranchName}
                onChange={(e) => setNewBranchName(e.target.value)}
                addonAfter={
                  <PlusOutlined
                    onClick={() => {
                      onCreateBranch?.(newBranchName);
                      setNewBranchName("");
                    }}
                  />
                }
              />
            )}
          </>
        )}
      />
      {branchMenu && (
        <PopoverButton
          className={styles.dropdown}
          popoverType="dropdown"
          buttonProps={{ type: "ghost" }}
          menu={{ items: branchMenu }}
          icon={<VerticalDots />}
          trigger={["click"]}
          arrow
          disabled={!branches?.length}
        />
      )}
    </div>
  );
};

export default BranchSelection;
