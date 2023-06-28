import { Input } from "antd";

import SearchIcon from "@/assets/search.svg";

import styles from "./index.module.less";

import type { FC } from "react";

interface SearchInputProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder: string;
}

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <Input
      className={styles.input}
      prefix={<SearchIcon className={styles.inputIcon} />}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
};

export default SearchInput;
