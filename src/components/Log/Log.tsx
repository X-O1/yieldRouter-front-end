import styles from "./Log.module.css";

const Log = () => {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>Logs</span>
        <span className={styles.subTitle}>- Deposited 1000 aUSDC</span>
        <span className={styles.subTitle}>- Granted Access to 0xabc... 321</span>
        <span className={styles.subTitle}>- Router Activated</span>
        <span className={styles.subTitle}>- Yield Routed to 0xabc... 321</span>
      </div>
    </>
  );
};

export default Log;
