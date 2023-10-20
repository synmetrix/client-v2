import styles from "./index.module.less";

import type { ReactNode } from "react";

interface BouncingDotsLoaderProps {
  loading?: boolean;
  children?: ReactNode;
}

const BouncingDotsLoader: React.FC<BouncingDotsLoaderProps> = ({
  loading,
  children,
}) => {
  return (
    <>
      {loading ? (
        <div className={styles.bouncingDots}>
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default BouncingDotsLoader;
