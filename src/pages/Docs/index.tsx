import { Space, Spin } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useParams } from "@vitjs/runtime";
import { useTranslation } from "react-i18next";

import AppLayout from "@/layouts/AppLayout";
import Button from "@/components/Button";
import Markdown from "@/components/Markdown";
import ErrorFound from "@/components/ErrorFound";
import { useVersionDocSubscription } from "@/graphql/generated";
import downloadBlob from "@/utils/helpers/downloadBlob";

import s from "./index.module.less";

interface DocsProps {
  markdownDocs?: string | null;
  fetching?: boolean;
  versionId: string;
}

export const Docs: React.FC<DocsProps> = ({
  markdownDocs,
  fetching = false,
  versionId,
}) => {
  const { t } = useTranslation(["docs", "common"]);

  const downloadDoc = useCallback(() => {
    if (markdownDocs) {
      const blob = new Blob([markdownDocs.replace(/&nbsp;/g, "")]);
      downloadBlob(blob, `${versionId}.md`);
    }
  }, [markdownDocs, versionId]);

  return (
    <AppLayout title={versionId}>
      <Spin spinning={fetching}>
        <Space className={s.space} direction="vertical">
          <Button
            type="primary"
            onClick={downloadDoc}
            icon={<DownloadOutlined />}
            disabled={!markdownDocs}
          >
            {t("download")}
          </Button>

          <Markdown>
            {fetching ? `## ${t("common:words.loading")}...` : markdownDocs}
          </Markdown>
        </Space>
      </Spin>
    </AppLayout>
  );
};

const DocsWrapper: React.FC = () => {
  const { versionId } = useParams();
  const [docData] = useVersionDocSubscription({
    variables: {
      id: versionId,
    },
  });

  const markdown = docData?.data?.versions_by_pk?.markdown_doc;

  if (!versionId) {
    return <ErrorFound status={404} />;
  }

  return (
    <Docs
      fetching={docData.fetching}
      markdownDocs={markdown}
      versionId={versionId}
    />
  );
};

export default DocsWrapper;
