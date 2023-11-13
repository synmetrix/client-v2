import { Col, Input, Row, Space } from "antd";
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useResponsive } from "ahooks";
import { useTranslation } from "react-i18next";
import cn from "classnames";

import Button from "@/components/Button";
import Select from "@/components/Select";
import SearchInput from "@/components/SearchInput";
import PopoverButton from "@/components/PopoverButton";
import DataSourcesMenu from "@/components/DataSourcesMenu";
import DataSchemaForm from "@/components/DataSchemaForm";
import type { Branch, DataSourceInfo } from "@/types/dataSource";
import type { Dataschema } from "@/types/dataschema";

import BranchIcon from "@/assets/branch.svg";
import VerticalDots from "@/assets/dots-vertical.svg";
import YMLIcon from "@/assets/yml-flie.svg";
import JSIcon from "@/assets/js-file.svg";

import styles from "./index.module.less";

import type { FC } from "react";
import type { MenuProps } from "antd";

export interface ModelsSidebarProps {
  dataSourceId?: string | null;
  branchMenu: MenuProps["items"];
  ideMenu: MenuProps["items"];
  branches: Branch[];
  currentBranch?: Branch;
  onChangeBranch: (branchId?: string) => void;
  docs: string;
  version?: string;
  files: Dataschema[];
  onSelectFile: (schema: string, hash?: string) => void;
  onSetDefault: (branchId?: string) => void;
  onCreateBranch: (name: string) => Promise<void>;
  onSchemaDelete: (schema: Dataschema) => void;
  onSchemaUpdate: (editId: string, values: Partial<Dataschema>) => void;
  onCreateFile: (values: Partial<Dataschema>) => void;
  dataSources: DataSourceInfo[];
  onDataSourceChange: (dataSource: DataSourceInfo | null) => void;
}

const icons = {
  js: <JSIcon className={styles.fileIcon} />,
  yml: <YMLIcon className={styles.fileIcon} />,
};

const ModelsSidebar: FC<ModelsSidebarProps> = ({
  branches,
  currentBranch,
  branchMenu,
  ideMenu,
  onChangeBranch,
  onSetDefault,
  docs,
  version,
  files,
  onCreateFile,
  onSelectFile,
  onCreateBranch,
  onSchemaDelete,
  onSchemaUpdate,
  dataSources,
  onDataSourceChange,
  dataSourceId,
}) => {
  const { t } = useTranslation(["models", "common"]);
  const windowSize = useResponsive();
  const isMobile = windowSize.md === false;

  const [isCreateFormOpen, setIsCreateFormOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [newBranchName, setNewBranchName] = useState<string>("");
  const [editPopover, setEditPopover] = useState<{
    id: string;
    type: "remove" | "edit";
  } | null>(null);

  const onPopoverChange =
    (file: Dataschema, type: "remove" | "edit") => (isVisible: boolean) => {
      if (isVisible) {
        setEditPopover({
          id: file.id,
          type,
        });
      } else {
        setEditPopover(null);
      }
    };

  return (
    <Space className={styles.wrapper} size={16} direction="vertical">
      <DataSourcesMenu
        selectedId={dataSourceId}
        entities={dataSources}
        onChange={onDataSourceChange}
      />
      <div className={styles.inner}>
        <Space className={styles.space} align="end">
          <Space className={styles.space} size={10} direction="vertical">
            <div className={styles.label}>{t("common:words.branch")}:</div>

            <Select
              className={cn(styles.select, isMobile && styles.selectMobile)}
              placeholder={t("common:words.select_branch")}
              prefixIcon={<BranchIcon />}
              size="large"
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
                  <Input
                    value={newBranchName}
                    onChange={(e) => setNewBranchName(e.target.value)}
                    addonAfter={
                      <PlusOutlined
                        onClick={() => {
                          onCreateBranch(newBranchName);
                          setNewBranchName("");
                        }}
                      />
                    }
                  />
                </>
              )}
            />
          </Space>

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
        </Space>

        <Space className={styles.space} size={10} direction="vertical">
          {branches?.length ? (
            <div>
              <span> {t("sidebar.version")}:</span>{" "}
              <Button
                className={styles.docsLink}
                type="link"
                href={docs}
                target="_blank"
              >
                {t("sidebar.open_docs")}
              </Button>
            </div>
          ) : null}
          <div className={styles.version}>{version}</div>
          {currentBranch && currentBranch.status !== "active" && (
            <Button
              className={styles.default}
              onClick={() => onSetDefault(currentBranch?.id)}
            >
              {t("sidebar.set_as_default")}
            </Button>
          )}
        </Space>

        <Space className={styles.space} size={16} direction="vertical">
          <Space className={styles.space} size={10} align="center">
            <SearchInput
              value={searchValue}
              onChange={setSearchValue}
              placeholder={t("common:form.placeholders.search")}
            />

            <PopoverButton
              trigger={["click"]}
              open={isCreateFormOpen}
              onOpenChange={setIsCreateFormOpen}
              icon={<PlusOutlined className={styles.plusIcon} />}
              buttonProps={{
                className: styles.addFile,
                disabled: !branches?.length,
              }}
              content={
                <DataSchemaForm
                  onSubmit={(data) => {
                    setIsCreateFormOpen(false);
                    onCreateFile(data);
                  }}
                />
              }
            />

            {ideMenu && (
              <PopoverButton
                className={styles.dropdown}
                popoverType="dropdown"
                buttonProps={{ type: "ghost" }}
                menu={{ items: ideMenu }}
                icon={<VerticalDots />}
                trigger={["click"]}
                arrow
                disabled={!branches?.length}
              />
            )}
          </Space>

          {files
            .filter((f) =>
              f.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((f) => {
              return (
                <div
                  key={f.id}
                  className={styles.fileBtn}
                  onClick={() => onSelectFile(f.name)}
                >
                  <Row justify={"space-between"} wrap={false}>
                    <Col className={styles.filename} span={18}>
                      {icons[f.name.split(".")[1] as keyof typeof icons]}{" "}
                      {f.name}
                    </Col>

                    <Col span={6}>
                      <Space align="center" size={5}>
                        <PopoverButton
                          className={styles.edit}
                          trigger={["click"]}
                          icon={<EditOutlined />}
                          isVisible={
                            editPopover?.id === f.id &&
                            editPopover?.type === "edit"
                          }
                          onVisibleChange={onPopoverChange(f, "edit")}
                          content={
                            <DataSchemaForm
                              defaultValues={f}
                              onSubmit={(d) =>
                                onSchemaUpdate(f.id, {
                                  ...f,
                                  ...d,
                                })
                              }
                            />
                          }
                          buttonProps={{
                            size: "small",
                            type: "text",
                          }}
                        />

                        <PopoverButton
                          popoverType="popconfirm"
                          title={t("sure_delete")}
                          buttonProps={{
                            size: "small",
                            type: "text",
                          }}
                          isVisible={
                            editPopover?.id === f.id &&
                            editPopover?.type === "remove"
                          }
                          onVisibleChange={onPopoverChange(f, "remove")}
                          trigger={"click"}
                          onConfirm={(e) => {
                            e?.preventDefault();
                            e?.stopPropagation();
                            onSchemaDelete(f.id);
                          }}
                          okText={t("common:words.remove")}
                          cancelText={t("common:words.cancel")}
                          icon={<DeleteOutlined />}
                        />
                      </Space>
                    </Col>
                  </Row>
                </div>
              );
            })}
        </Space>
      </div>
    </Space>
  );
};

export default ModelsSidebar;
