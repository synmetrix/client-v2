import Button from "@/components/Button";

import DocsIcon from "@/assets/docs-grey.svg";

import styles from "./index.module.less";

import type { ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  text: string;
  href?: string;
  linkText?: string;
}

const InfoBlock: React.FC<Props> = ({
  icon = <DocsIcon />,
  text,
  href,
  linkText,
}) => {
  return (
    <div className={styles.howBlock}>
      {icon}
      <span>
        {text}
        {href ? (
          <Button
            className={styles.link}
            type="link"
            target="_blank"
            href={href}
          >
            {linkText || href}
          </Button>
        ) : null}
      </span>
    </div>
  );
};

export default InfoBlock;
