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
  onConfirm = () => {},
  onCancel = () => {},
  children,
}) => {
  const { t } = useTranslation(["common"]);
  const [modal, contextHolder] = Modal.useModal();

  const confirm = () => {
    modal.confirm({
      title: title || t("delete"),
      icon,
      content: content || t("are_you_sure"),
      okText: okText || t("ok"),
      cancelText: cancelText || t("cancel"),
      onOk: onConfirm,
      onCancel,
    });
  };

  return (
    <>
      {contextHolder}
      <div onClick={confirm}>{children}</div>
    </>
  );
};

export default ConfirmModal;
