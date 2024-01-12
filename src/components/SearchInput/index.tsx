import { Input } from "antd";
import cn from "classnames";

import SearchIcon from "@/assets/search.svg";

import styles from "./index.module.less";

import type { FC } from "react";

interface SearchInputProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder: string;
  className?: string;
}

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <Input
      className={cn(styles.input, className)}
      prefix={<SearchIcon className={styles.inputIcon} />}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      bordered={false}
      value={value}
    />
  );
};

export default SearchInput;
