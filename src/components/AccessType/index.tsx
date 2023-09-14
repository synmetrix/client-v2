import { useTranslation } from "react-i18next";
import { Spin } from "antd";

import { useFetchMetaQuery } from "@/graphql/generated";
import type { AccessType as Access, DataSourceAccess } from "@/types/access";

import FullAccessIcon from "@/assets/access-full.svg";
import PartialAccessIcon from "@/assets/access-partial.svg";
import NoAccessIcon from "@/assets/access-no.svg";

import { prepareResourceData } from "../RoleForm";
import { detectAccessType } from "../AccessController";

import styles from "./index.module.less";

interface AccessTypeProps {
  access: Access;
}

interface AccessTypeWrapperProps {
  access?: Access;
  dataSourceId: string;
  permissions: any;
}

import type { FC } from "react";

const AccessType: FC<AccessTypeProps> = ({ access }) => {
  const { t } = useTranslation(["common"]);

  const renderType = () => {
    switch (access) {
      case "full":
        return (
          <>
            <FullAccessIcon className={styles.icon} />
            {t("common:words.full_access")}
          </>
        );
      case "partial":
        return (
          <>
            <PartialAccessIcon className={styles.icon} />
            {t("common:words.partial_access")}
          </>
        );

      default:
        return (
          <>
            <NoAccessIcon className={styles.icon} />
            {t("common:words.no_access")}
          </>
        );
    }
  };

  return <div className={styles.type}>{renderType()}</div>;
};

export const detectSourceAccessType = (types: Access[]): Access => {
  if (types.every((t) => t === "no")) {
    return "no";
  }

  if (types.every((t) => t === "full")) {
    return "full";
  }

  return "partial";
};

export const AccessTypeWrapper: FC<AccessTypeWrapperProps> = ({
  dataSourceId,
  permissions,
}) => {
  const [accessType, setAccess] = useState("no" as Access);
  const [metaData] = useFetchMetaQuery({
    variables: { datasource_id: dataSourceId },
  });
  useEffect(() => {
    const cubes = metaData?.data?.fetch_meta?.cubes;

    if (!cubes) {
      return;
    }

    const resourceData = prepareResourceData(cubes, {} as DataSourceAccess);
    const types = resourceData.dataModels.map((m) =>
      detectAccessType(m, permissions)
    );
    const res = detectSourceAccessType(types);
    setAccess(res);
  }, [dataSourceId, metaData?.data?.fetch_meta?.cubes, permissions]);

  return (
    <Spin spinning={metaData.fetching}>
      <AccessType access={accessType} />
    </Spin>
  );
};

export default AccessType;
