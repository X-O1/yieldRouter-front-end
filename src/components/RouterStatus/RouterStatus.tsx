import styles from "./RouterStatus.module.css";
import ManageRouterState from "../ManageRouterState/ManageRouterState";
import { usePersistentState } from "../../store/LocalStorage.ts";
import { evmWalletExist, getProvider } from "../../lib/Ethers/GetEthers.ts";
import { Contract, formatUnits } from "ethers";
import { ERC20_CONTRACT } from "../../lib/Ethers/abi/ERC20.ts";
import { useEffect } from "react";

const RouterStatus = () => {
  const [routerNickname] = usePersistentState("router-nickname", "");
  const [selectedRouter] = usePersistentState("selected-router", "");
  const [tokenAddress] = usePersistentState<string>("currency-address", "");
  const [tokenBalance, setTokenBalance] = usePersistentState<number>("token-balance", 0);

  useEffect(() => {
    const getBalance = async (): Promise<void> => {
      if (!evmWalletExist) return;
      const provider = getProvider();
      const token = new Contract(tokenAddress, ERC20_CONTRACT.abi, provider);
      try {
        const decimals = await token.decimals();
        const balance = await token.balanceOf(selectedRouter);
        const formatted = parseFloat(formatUnits(balance, decimals));
        const truncated = Math.round(formatted * 10_000) / 10_000;

        setTokenBalance(truncated);
        console.log("Token Balance:", truncated);
      } catch (error) {
        console.log("Getting Token Balance Failed", error);
      }
    };
    getBalance();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.statusContainer}>
          <span className={styles.title}>Router Status</span>
          <span className={styles.subTitle}>
            Router: {routerNickname} ({selectedRouter.slice(0, 6)}...{selectedRouter.slice(-4)})
          </span>

          <span className={styles.subTitle}>Balance: {tokenBalance} aUSDC</span>
          <span className={styles.subTitle}>Active: true</span>
          <span className={styles.subTitle}>Destination: 0xabc...123</span>

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
