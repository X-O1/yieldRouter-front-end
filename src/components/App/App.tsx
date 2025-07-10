import styles from "./App.module.css";
import Header from "../Header/Header.tsx";
import RouterStatus from "../RouterStatus/RouterStatus.tsx";
import DepositWithdraw from "../DepositWithdraw/DepositWithdraw.tsx";
import AccessControl from "../AccessControl/AccessControl.tsx";
import Log from "../Log/Log.tsx";
import RouterControl from "../RouterControl/RouterControl.tsx";
function App() {
  return (
    <>
      <div className={styles.container}>
        <Header></Header>
        <RouterStatus></RouterStatus>
        <DepositWithdraw></DepositWithdraw>
        <AccessControl></AccessControl>
        <RouterControl></RouterControl>
        <Log></Log>
      </div>
    </>
  );
}

export default App;
