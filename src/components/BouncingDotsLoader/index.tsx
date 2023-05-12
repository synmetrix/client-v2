import styles from "./index.module.less";

const BouncingDotsLoader: React.FC = () => {
  return (
    <div className={styles.bouncingDots}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
  );
};

export default BouncingDotsLoader;
