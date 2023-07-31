import { Modal as BasicModal } from "antd";

import Button from "@/components/Button";

import CloseIcon from "@/assets/close.svg";

import styles from "./index.module.less";

import type { ModalProps as BasicModalProps } from "antd";
import type { FC } from "react";

interface ModalProps extends BasicModalProps {
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ children, closable, ...props }) => {
  return (
    <BasicModal
      {...props}
      onCancel={props.onCancel || props.onClose}
      closable={false}
      maskStyle={{ backdropFilter: "blur(10px)" }}
    >
      <div className={styles.overlay} onClick={props.onClose}>
        {closable && (
          <Button
            className={styles.closeBtn}
            onClick={props.onClose}
            type="text"
          >
            <CloseIcon className={styles.closeIcon} />
          </Button>
        )}
      </div>
      {children}
    </BasicModal>
  );
};

export default Modal;
