import styles from "./RouterStatus.module.css";
const RouterStatus = () => {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>Router Status</span>
        {/* 
        <details className={styles.statusContainer}>
          <summary className={styles.statusHeader}>Router Status</summary>
          <div className={styles.statusContainer}> */}
        <span className={styles.subTitle}>Nickname: Genesis</span>
        <span className={styles.subTitle}>Currency: aUSDC(0xabc...123)</span>
        <span className={styles.subTitle}>Balance: 1000</span>
        <span className={styles.subTitle}>Active: true</span>
        <span className={styles.subTitle}>Destination: 0xabc...123</span>
        <span className={styles.subTitle}>Automation Fee: 0.5% (auto-deducted)</span>
      </div>
      {/* </details> */}
      {/* </div> */}
    </>
  );
};

export default RouterStatus;
