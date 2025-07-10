import styles from "./App.module.css";
import Header from "../Header/Header.tsx";

function App() {
  return (
    <>
      <div className={styles.container}>
        <Header></Header>
      </div>
    </>
  );
}

export default App;
