import styles from "./RouterControl.module.css";

const RouterControl = () => {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>Router Control</span>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonActivate}>Activate Router</button>
          <button className={styles.buttonDeactivate}>Deactivate Router</button>
        </div>
      </div>
    </>
  );
};

export default RouterControl;
