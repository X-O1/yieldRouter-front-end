import styles from "./App.module.css";
import Header from "../Header/Header.tsx";
import RouterStatus from "../RouterStatus/RouterStatus.tsx";
import DepositWithdraw from "../DepositWithdraw/DepositWithdraw.tsx";
import AccessControl from "../AccessControl/AccessControl.tsx";
function App() {
  return (
    <>
      <div className={styles.container}>
        <Header></Header>
        <RouterStatus></RouterStatus>
        <DepositWithdraw></DepositWithdraw>
        <AccessControl></AccessControl>
      </div>
    </>
  );
}

export default App;
