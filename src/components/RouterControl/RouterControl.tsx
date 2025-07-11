import styles from "./RouterControl.module.css";

const RouterControl = () => {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>Router Control</span>
        <select className={styles.selectDestination}>
          <option disabled selected>
            Select Yield Destination
          </option>
          <option>0x1234...abcd</option>
          <option>0x5678...def0</option>
          <option>0x9abc...7890</option>
        </select>

        <div className={styles.buttonContainer}>
          <button className={styles.buttonActivate}>Activate Router</button>
          <button className={styles.buttonDeactivate}>Deactivate Router</button>
        </div>
      </div>
    </>
  );
};

export default RouterControl;
