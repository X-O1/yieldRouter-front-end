import styles from "./RouterFactoryList.module.css";

const RouterFactoryList = () => {
  return (
    <>
      <div>
        <select className={styles.selectFactory}>
          <option disabled selected>
            Select Yield Destination
          </option>
          <option>0x1234...abcd</option>
          <option>0x5678...def0</option>
          <option>0x9abc...7890</option>
        </select>
      </div>
    </>
  );
};

export default RouterFactoryList;
