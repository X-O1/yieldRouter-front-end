import styles from "./Header.module.css";
const Header = () => {
  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>yieldwield</span>
        <span className={styles.subTitle}>secure yield routing</span>
      </div>
    </>
  );
};

export default Header;
