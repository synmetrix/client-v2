import React, { useMemo } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { get, getOr, set } from "unchanged";
import { useTranslation } from "react-i18next";
import { Button, Row, Form, Tabs, Collapse } from "antd";
import cx from "classnames";

import useCollapse from "@/hooks/useCollapse";
import Input from "@/components/Input";

import s from "./index.module.less";

import type { TabsProps } from "antd";
import type { ReactNode } from "react";

const { Panel } = Collapse;

const noop = () => {
  return null;
};

const SimpleForm: (props: SimpleFormProps) => JSX.Element = (props) => {
  const { t } = useTranslation();

  const {
    initialValues,
    onSubmit,
    loading = false,
    config,
    layout,
    submitText = "",
    submitIcon = null,
    submitSize,
    autoSubmit = false,
    disabled = false,
    itemClassName,
    collapseActiveKeys = [],
    tabsConfig,
    ...restProps
  } = props;

  const { control, handleSubmit, watch } = useForm({ values: initialValues });

  useEffect(() => {
    const subscription = watch(() => {
      if (autoSubmit) {
        handleSubmit(onSubmit)();
      }
    });

    return () => subscription.unsubscribe();
  }, [autoSubmit, handleSubmit, onSubmit, watch]);

  const cls = cx({
    [s.formItem]: true,
    ...itemClassName,
  });

  type SectionsIndex = Record<string, Record<string, FormItem>>;

  const sectionsIndex: SectionsIndex = useMemo(() => {
    const entries = config ? Object.entries(config) : [];

    const sections = entries.reduce((acc, [key, val]) => {
      const { section = "default", subSection = "default" } = val || {};

      return set([section, subSection, key], val, acc);
    }, {});

    return sections;
  }, [config]);

  const { state: collapseState, onToggleSection } =
    useCollapse(collapseActiveKeys);

  const getItems = useCallback(
    (): TabsProps["items"] =>
      Object.entries(sectionsIndex).map(([key, section]) => {
        const subSections = Object.entries(section);

        let res = null;
        if (subSections.length > 1) {
          res = subSections.map(([subSectionKey, subSectionItems]) => {
            const subSectionFormItems = Object.entries(subSectionItems);

            if (subSectionKey === "default") {
              return subSectionFormItems.map(([itemKey, item]) => (
                <Input
                  className={cls}
                  key={itemKey}
                  control={control}
                  name={item.name}
                  label={item.label}
                  defaultValue={item.defaultValue}
                  fieldType={item.type}
                  size={item.size}
                />
              ));
            }

            return (
              <Collapse
                ghost
                key={`${subSectionKey}_collapse`}
                className={s.collapse}
                bordered={false}
                activeKey={collapseState.activePanelKey}
                onChange={() => onToggleSection(subSectionKey)}
              >
                <Panel header={t(subSectionKey)} key={subSectionKey}>
                  {subSectionFormItems.map(([itemKey, item]) => (
                    <Input
                      className={cls}
                      key={itemKey}
                      control={control}
                      name={item.name}
                      label={item.label}
                      defaultValue={item.defaultValue}
                      fieldType={item.type}
                      size={item.size}
                    />
                  ))}
                </Panel>
              </Collapse>
            );
          });
        } else {
          // if contains only default subsection
          const sectionFormItems: [string, FormItem][] = Object.entries(
            getOr({}, "[0][1]", subSections)
          );
          res = (
            <div className={s.subSection}>
              {sectionFormItems.map(([itemKey, item]) => (
                <Input
                  className={cx(cls, s.subSectionInput)}
                  key={itemKey}
                  control={control}
                  name={item.name}
                  label={item.label}
                  defaultValue={item.defaultValue}
                  fieldType={item.type}
                  size={item.size}
                />
              ))}
            </div>
          );
        }

        const onTabClose = get(`${key}.onTabClose`, tabsConfig) || noop;
        const closable = get(`${key}.closable`, tabsConfig) || false;

        let title = key;
        const numTitle = title.match(/(\D+)(\d+)/);

        if (numTitle?.[2]) {
          title = `${t(numTitle?.[1])}${numTitle?.[2]}`;
        }

        const tab = (
          <div>
            {t(title)}
            {closable && (
              <Button
                onClick={() => onTabClose(key)}
                type="link"
                shape="circle"
                icon="close"
                size="small"
                className={s.close}
              />
            )}
          </div>
        );

        return {
          label: tab,
          key,
          children: res,
        };
      }),
    [
      cls,
      collapseState.activePanelKey,
      control,
      onToggleSection,
      sectionsIndex,
      t,
      tabsConfig,
    ]
  );

  const formContent = useMemo(() => {
    let items;
    if (Object.keys(sectionsIndex).length > 0) {
      // if not only default sections
      items = <Tabs defaultActiveKey="1" animated={false} items={getItems()} />;
    }

    return items;
  }, [getItems, sectionsIndex]);

  return (
    <Row gutter={24} className={s.root}>
      <Form {...restProps} layout={layout} className={s.form}>
        <div className={s.content}>{formContent}</div>
        {submitText && (
          <div>
            <Button
              onClick={handleSubmit(onSubmit)}
              loading={loading}
              disabled={disabled}
              type="primary"
              ghost
              htmlType="submit"
              size={submitSize}
            >
              {submitIcon}
              {submitText}
            </Button>
          </div>
        )}
      </Form>
    </Row>
  );
};

interface FormItem {
  section: string;
  name: string;
  label: string;
  subSection?: string;
  defaultValue?: any;
  type?: string;
  size?: "small" | "middle" | "large";
}

interface SimpleFormProps {
  config: Record<string, FormItem>;
  onSubmit: (data: object) => void;
  layout?: "vertical" | "horizontal" | "inline";
  loading?: boolean;
  initialValues?: Record<string, string>;
  submitIcon?: ReactNode;
  autoSubmit?: boolean;
  itemClassName?: Record<string, boolean>;
  collapseActiveKeys?: string[];
  tabsConfig?: object;
  disabled?: boolean;
  style?: object;
  submitText?: string;
  submitSize?: "small" | "middle" | "large";
}

export default SimpleForm;
