import { Dropdown, Space } from "antd";
import { DownOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

import Button from "@/components/Button";
import Select from "@/components/Select";
import SearchInput from "@/components/SearchInput";

import BranchIcon from "@/assets/branch.svg";
import VerticalDots from "@/assets/dots-vertical.svg";
import YMLIcon from "@/assets/yml-flie.svg";

import styles from "./index.module.less";

import type { FC } from "react";
import type { MenuProps } from "antd";

interface ModelsSidebarProps {
  branches: string[];
  docs: string;
  version: string;
  files: string[];
  onCreateFile: (name: string) => void;
  onSelectFile: (name: string) => void;
  onSetDefaultVersion: (version: string) => void;
}

const ModelsSidebar: FC<ModelsSidebarProps> = ({
  branches,
  docs,
  version,
  files,
  onCreateFile,
  onSelectFile,
  onSetDefaultVersion,
}) => {
  const { t } = useTranslation(["models", "common"]);

  const [branchMenu, setBrahcnMenu] = useState<boolean>(false);
  const [searchMenu, setSearchMenu] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const items: MenuProps["items"] = [
    {
      label: "Menu",
      key: "1",
    },
    {
      label: "Items",
      key: "2",
    },
    {
      label: "Will be",
      key: "3",
    },
    {
      label: "Here",
      key: "4",
    },
  ];

  return (
    <Space className={styles.wrapper} size={16} direction="vertical">
      <Space className={styles.space} align="end">
        <Space className={styles.space} size={10} direction="vertical">
          <div className={styles.label}>{t("common:words.branch")}:</div>

          <Select
            className={styles.select}
            prefixIcon={<BranchIcon />}
            size="large"
            defaultValue={branches.find((b) => b.includes("default"))}
            optionLabelProp="valueLabel"
            suffixIcon={<DownOutlined />}
            options={branches.map((b) => ({
              value: b,
              label: b,
            }))}
          />
        </Space>

        <Dropdown
          className={styles.dropdown}
          menu={{
            items: items.map((i) => ({
              ...i,
              onClick: () => setBrahcnMenu(false),
            })) as MenuProps["items"],
          }}
          placement="bottomRight"
          arrow
          open={branchMenu}
        >
          <Button
            type="ghost"
            onClick={() => setBrahcnMenu((prevState) => !prevState)}
          >
            <VerticalDots />
          </Button>
        </Dropdown>
      </Space>

      <Space className={styles.space} size={10} direction="vertical">
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
        <div className={styles.version}>{version}</div>
        <Button
          className={styles.default}
          onClick={() => onSetDefaultVersion(version)}
        >
          {t("sidebar.set_as_default")}
        </Button>
      </Space>

      <Space className={styles.space} size={16} direction="vertical">
        <Space className={styles.space} size={10} align="center">
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            placeholder={t("common:form.placeholders.search")}
          />
          <Button
            className={styles.addFile}
            onClick={() => searchValue && onCreateFile(searchValue)}
          >
            <PlusOutlined className={styles.plusIcon} />
          </Button>

          <Dropdown
            menu={{
              items: items.map((i) => ({
                ...i,
                onClick: () => setSearchMenu(false),
              })) as MenuProps["items"],
            }}
            placement="bottomRight"
            arrow
            open={searchMenu}
          >
            <Button
              type="ghost"
              onClick={() => setSearchMenu((prevState) => !prevState)}
            >
              <VerticalDots />
            </Button>
          </Dropdown>
        </Space>

        {files
          .filter((f) => f.toLowerCase().includes(searchValue.toLowerCase()))
          .map((f) => (
            <Button
              key={f}
              className={styles.fileBtn}
              type="text"
              icon={<YMLIcon className={styles.fileIcon} />}
              onClick={() => onSelectFile(f)}
            >
              {f}
            </Button>
          ))}
      </Space>
    </Space>
  );
};

export default ModelsSidebar;
