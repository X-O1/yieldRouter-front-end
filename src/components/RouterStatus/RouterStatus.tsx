import styles from "./RouterStatus.module.css";
const RouterStatus = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.statusContainer}>
          <span className={styles.title}>Router Status</span>
          <span className={styles.subTitle}>Nickname: Genesis</span>
          <span className={styles.subTitle}>Active: true</span>
          <span className={styles.subTitle}>Destination: 0xabc...123</span>
          <span className={styles.subTitle}>Balance: 1000 aUSDC</span>

          <details className={styles.collapsible}>
            <summary className={styles.title}>click for rules & router details</summary>

            <div className={styles.statusContainer}>
              <span className={styles.title}>Rules</span>
              <span className={styles.subTitle}>One token per Router.</span>
              <span className={styles.subTitle}>You own this Router.</span>
              <span className={styles.subTitle}>Only YOU can...</span>
              <span className={styles.subTitle}>- Deposit</span>
              <span className={styles.subTitle}>- Withdraw</span>
              <span className={styles.subTitle}>- Choose Yield Destination</span>
              <span className={styles.subTitle}>Make as many as you need.</span>
            </div>

            <div className={styles.statusContainer}>
              <span className={styles.title}>Router Details</span>
              <span className={styles.subTitle}>Router Address: 0xabc...123</span>
              <span className={styles.subTitle}>Currency: aUSDC(0xabc...123)</span>
              <span className={styles.subTitle}>Automation Cost: 0.5% (auto-deducted)</span>
            </div>
          </details>
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.buttonCreateRouter}>Create Router</button>
          <button className={styles.buttonSwitchRouter}>Switch Router</button>
          {/* <button className={styles.buttonConnect}>Connect</button> */}
        </div>
      </div>
    </>
  );
};

export default RouterStatus;
