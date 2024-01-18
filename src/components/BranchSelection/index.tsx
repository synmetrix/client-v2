import { Form, Space, Typography } from "antd";
import { useResponsive } from "ahooks";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import cn from "classnames";

import Input from "@/components/Input";
import Button from "@/components/Button";
import Select from "@/components/Select";
import type { Branch } from "@/types/dataSource";
import ConfirmModal from "@/components/ConfirmModal";
import { Branch_Statuses_Enum } from "@/graphql/generated";

import BranchGreyIcon from "@/assets/branch.svg";
import BranchBlackIcon from "@/assets/branch-black.svg";
import BranchColoredIcon from "@/assets/branch-colored.svg";
import TrashColoredIcon from "@/assets/trash-colored.svg";
import ArrowIcon from "@/assets/arrow-small.svg";

import styles from "./index.module.less";

const { Paragraph } = Typography;

export interface CreateBranchFormValues {
  name: string;
}

interface BranchSelectionProps {
  branches: Branch[];
  currentBranch?: Branch;
  disableActions?: boolean;
  loading?: boolean;
  onChangeBranch?: (branchId: string) => void;
  onCreateBranch?: (data: CreateBranchFormValues) => void;
  onSetDefault?: (branchId: string) => void;
  onDeleteBranch?: (branchId: string) => void;
}

const BranchSelection: React.FC<BranchSelectionProps> = ({
  branches,
  currentBranch,
  disableActions,
  loading,
  onChangeBranch = () => {},
  onCreateBranch = () => {},
  onSetDefault = () => {},
  onDeleteBranch = () => {},
}) => {
  const { t } = useTranslation(["models", "common"], { useSuspense: false });

  const { control, handleSubmit } = useForm<CreateBranchFormValues>();

  const windowSize = useResponsive();
  const isMobile = windowSize.md === false;

  const onDefault = (e: any, branchId: string) => {
    e.stopPropagation();
    onSetDefault(branchId);
  };

  const onDelete = (branchId: string) => {
    onDeleteBranch(branchId);
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
        optionLabelProp="title"
        suffixIcon={<ArrowIcon />}
        options={(branches || []).map((b) => ({
          value: b.id,
          label: b.name,
          title:
            b.status === Branch_Statuses_Enum.Active
              ? `${b.name}-${t("common:words.default")}`
              : b.name,
          status: b.status,
        }))}
        optionRender={({ value, label, data }) => {
          const isDefault = data?.status === Branch_Statuses_Enum.Active;
          const isActive = value === currentBranch?.id;
          const icon = isActive ? <BranchBlackIcon /> : <BranchGreyIcon />;

          return (
            <div className={styles.container}>
              <div className={styles.label}>
                <span className={styles.icon}>{icon}</span>
                <Paragraph
                  title={label as string}
                  ellipsis
                  className={styles.paragraph}
                >
                  {label}
                </Paragraph>
              </div>

              <Space size={12} className={styles.actions}>
                {(!disableActions || isDefault) && (
                  <Button
                    size="small"
                    type="text"
                    disabled={isDefault}
                    className={cn(
                      styles.button,
                      isDefault && styles.defaultButton
                    )}
                    onClick={(e) => onDefault(e, value as string)}
                  >
                    {isDefault
                      ? t("common:words.default").toUpperCase()
                      : t("models:sidebar.set_default").toUpperCase()}
                  </Button>
                )}

                {!disableActions && (
                  <div onClick={(e) => e.stopPropagation()}>
                    <ConfirmModal
                      title={t("common:words.delete_branch")}
                      className={styles.deleteText}
                      onConfirm={() => onDelete?.(value as string)}
                    >
                      <Button
                        size="small"
                        type="text"
                        className={styles.button}
                      >
                        <TrashColoredIcon />
                      </Button>
                    </ConfirmModal>
                  </div>
                )}
              </Space>
            </div>
          );
        }}
        placement="bottomRight"
        popupClassName={styles.popup}
        onChange={onChangeBranch}
        disabled={!branches?.length}
        dropdownRender={(menu) => (
          <div>
            {menu}
            {!disableActions && (
              <Space className={styles.inputWrapper}>
                <Form
                  id="create-branch-form"
                  layout="vertical"
                  className={styles.form}
                >
                  <Space>
                    <Input
                      rules={{ required: true }}
                      name="name"
                      fieldType="text"
                      size="middle"
                      control={control}
                    />
                    <Button
                      size="small"
                      type="text"
                      icon={<PlusOutlined />}
                      loading={loading}
                      className={cn(styles.button, styles.plusButton)}
                      onClick={handleSubmit(onCreateBranch)}
                    />
                  </Space>
                </Form>
              </Space>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default BranchSelection;
