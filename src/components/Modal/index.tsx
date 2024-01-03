import { Suspense } from "react";
import { Modal as BasicModal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import CloseIcon from "@/assets/close.svg";

import styles from "./index.module.less";

import type { FC } from "react";
import type { ModalProps as BasicModalProps } from "react-responsive-modal";

interface ModalProps extends BasicModalProps {
  width?: number;
  closable?: boolean;
  afterClose?: () => void;
}

const Modal: FC<ModalProps> = ({
  children,
  width = 800,
  closable = false,
  afterClose = () => {},
  ...props
}) => {
  const onClose = () => {
    props.onClose?.();
    const timeout = setTimeout(() => {
      afterClose();
    }, props.animationDuration || 300);
  };

  return (
    <>
      <BasicModal
        {...props}
        classNames={{
          modal: styles.modal,
        }}
        styles={{
          modal: {
            width,
          },
        }}
        onClose={onClose}
        closeIcon={closable && <CloseIcon className={styles.closeIcon} />}
        center
      >
        <Suspense>{children}</Suspense>
      </BasicModal>
    </>
  );
};

export default Modal;
