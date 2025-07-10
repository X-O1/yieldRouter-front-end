import styles from "./DepositWithdraw.module.css";
const DepositWithdraw = () => {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>Deposit/Withdraw</span>
        <div className={styles.buttonContainer}>
          <input className={styles.amount} type="text" placeholder="Amount" />
          <button className={styles.buttonDeposit}>Deposit</button>
          <button className={styles.button}>Withdraw</button>
        </div>
      </div>
    </>
  );
};

export default DepositWithdraw;
