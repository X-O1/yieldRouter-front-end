import styles from "./RouterStatus.module.css";
const RouterStatus = () => {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>Router Status</span>
        <span className={styles.subTitle}>Active: true</span>
        <span className={styles.subTitle}>Destination: 0xabc...123</span>
      </div>
    </>
  );
};

export default RouterStatus;
