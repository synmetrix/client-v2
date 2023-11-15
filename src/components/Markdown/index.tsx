import { marked } from "marked";
import { useTranslation } from "react-i18next";

import s from "./index.module.less";

import type { FC } from "react";

interface MarkdownProps {
  children?: string | null;
}

const Markdown: FC<MarkdownProps> = ({ children }) => {
  const { t } = useTranslation(["common"]);

  const defaultContent = `# ${t("words.no_docs")}`;

  const docs: string | null = useMemo(() => {
    try {
      return marked.parse(children || defaultContent);
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [children, defaultContent]);

  if (!docs) return null;

  return (
    <div className={s.container}>
      <div dangerouslySetInnerHTML={{ __html: docs }} />
    </div>
  );
};

export default Markdown;
