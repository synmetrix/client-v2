import { Suspense } from "react";
import { Modal as BasicModal } from "antd";

import Button from "@/components/Button";

import CloseIcon from "@/assets/close.svg";

import styles from "./index.module.less";

import type { FC } from "react";
import type { ModalProps as BasicModalProps } from "antd";

interface ModalProps extends BasicModalProps {
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({
  children,
  closable,
  footer = null,
  ...props
}) => {
  return (
    <BasicModal
      {...props}
      footer={footer}
      onCancel={props.onCancel || props.onClose}
      closable={false}
      maskStyle={{ backdropFilter: "blur(10px)" }}
    >
      <Suspense>
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
      </Suspense>
    </BasicModal>
  );
};

export default Modal;
