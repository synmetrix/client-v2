import cn from "classnames";

import Button from "@/components/Button";

import DocsIcon from "@/assets/docs-grey.svg";

import styles from "./index.module.less";

import type { ReactNode } from "react";

interface Props {
  icon?: ReactNode;
  text?: string;
  href?: string;
  linkText?: string;
  className?: string;
}

const InfoBlock: React.FC<Props> = ({
  icon = <DocsIcon />,
  text,
  href,
  linkText,
  className,
}) => {
  return (
    <div className={cn(styles.howBlock, className)}>
      {icon}
      <span>
        {!!text && text}
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
