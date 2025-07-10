import styles from "./AccessControl.module.css";

const AccessControl = () => {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>Access Control</span>
        <span className={styles.log}>@0x1234... granted access</span>
        <input className={styles.addressInput} type="text" placeholder="Address" />

        <div className={styles.buttonContainer}>
          <button className={styles.button}>Add Address</button>
          <button className={styles.button}>Remove Address</button>
        </div>
      </div>
    </>
  );
};

export default AccessControl;
