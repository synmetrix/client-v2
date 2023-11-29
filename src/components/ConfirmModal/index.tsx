import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Modal } from "antd";

import type { ReactNode } from "react";

interface ConfirmModalProps {
  title?: string;
  icon?: ReactNode;
  content?: string;
  okText?: string;
  cancelText?: string;
  className?: string;
  children: ReactNode | string;
  onConfirm?: () => void;
  onCancel?: () => void | undefined;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  icon = <ExclamationCircleOutlined />,
  title,
  content,
  okText,
  cancelText,
  className,
  onConfirm = () => {},
  onCancel = () => {},
  children,
}) => {
  const { t } = useTranslation(["common"]);
  const [modal, contextHolder] = Modal.useModal();

  const confirm = () => {
    modal.confirm({
      title: title || t("common:words.delete"),
      icon,
      content: content || t("common:words.are_you_sure"),
      okText: okText || t("common:words.ok"),
      cancelText: cancelText || t("common:words.cancel"),
      onOk: onConfirm,
      onCancel,
    });
  };

  return (
    <>
      {contextHolder}
      <div className={className} onClick={confirm}>
        {children}
      </div>
    </>
  );
};

export default ConfirmModal;
