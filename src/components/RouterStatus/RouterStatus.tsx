import styles from "./RouterStatus.module.css";
import ManageRouterState from "../ManageRouterState/ManageRouterState";
import { usePersistentState } from "../../store/LocalStorage.ts";

const RouterStatus = () => {
  const [nickname] = usePersistentState("router-nickname", "");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.statusContainer}>
          <span className={styles.title}>Router Status</span>
          <span className={styles.subTitle}>Nickname: {nickname}</span>
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
        <ManageRouterState />
      </div>
    </>
  );
};

export default RouterStatus;
