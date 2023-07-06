import { useResponsive } from "ahooks";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Checkbox, Form } from "antd";
import cn from "classnames";

import type { DynamicForm, Schema } from "@/types/dataSource";

import styles from "./index.module.less";

import type { Control } from "react-hook-form";
import type { FC } from "react";

interface TableSelectionProps {
  schema: Schema;
  path: string;
  type: string;
  control: Control<DynamicForm>;
  initialValue?: DynamicForm;
}

const TableSelection: FC<TableSelectionProps> = ({
  schema,
  path,
  control,
  initialValue,
  type,
}) => {
  const windowSize = useResponsive();
  const { t } = useTranslation(["common"]);

  return (
    <>
      {Object.keys(schema[path]).map((tb) => (
        <div key={tb}>
          <Controller
            name={`${path}->${tb}`}
            control={control}
            defaultValue={initialValue?.[`${path}->${tb}`] ?? "off"}
            render={({ field: { onChange, value } }) => (
              <Form.Item className={cn(styles.field)} name={`${path}->${tb}`}>
                <div>
                  <Checkbox
                    checked={value === "on"}
                    onChange={() => onChange(value === "on" ? "off" : "on")}
                  >
                    <span
                      className={cn(styles.table, {
                        [styles.column]: !windowSize.md,
                      })}
                    >
                      <span>{tb}</span>
                      <span className={styles.separator}>→</span>
                      <span>
                        {tb}.{type}
                      </span>
                    </span>
                  </Checkbox>
                  <span
                    className={cn(styles.columns, {
                      [styles.block]: !windowSize.md,
                    })}
                  >
                    ({schema[path][tb].length}) {t("common:words.columns")}
                  </span>
                </div>
              </Form.Item>
            )}
          />
        </div>
      ))}
    </>
  );
};

export default TableSelection;
