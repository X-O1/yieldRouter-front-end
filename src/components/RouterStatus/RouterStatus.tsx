import styles from "./RouterStatus.module.css";
import ManageRouterState from "../ManageRouterState/ManageRouterState";
import { usePersistentState } from "../../store/LocalStorage.ts";
import { evmWalletExist, getProvider, getSigner } from "../../lib/Ethers/GetEthers.ts";
import { Contract, formatUnits } from "ethers";
import { ERC20_CONTRACT } from "../../lib/Ethers/abi/ERC20.ts";
import { useEffect } from "react";
import { ROUTER_CONTRACT } from "../../lib/Ethers/abi/Router.ts";

const RouterStatus = () => {
  const [routerNickname] = usePersistentState("router-nickname", "");
  const [selectedRouter] = usePersistentState("selected-router", "");
  const [tokenAddress] = usePersistentState<string>("currency-address", "");
  const [tokenBalance, setTokenBalance] = usePersistentState<number>("token-balance", 0);
  const [allowance, setAllowance] = usePersistentState<number>("allowance", 0);
  const [destinationAddress] = usePersistentState("destination-address", "");
  const [routerStatus, setRouterStatus] = usePersistentState<string>("router-status", "");

  useEffect(() => {
    const getBalance = async (): Promise<void> => {
      if (!evmWalletExist) return;
      const signer = await getSigner();
      const provider = getProvider();
      const token = new Contract(tokenAddress, ERC20_CONTRACT.abi, provider);
      const router = new Contract(selectedRouter, ROUTER_CONTRACT.abi, signer);

      try {
        const decimals = await token.decimals();
        const balance = await token.balanceOf(selectedRouter);
        const formatted = parseFloat(formatUnits(balance, decimals));
        const truncated = Math.round(formatted * 10_000) / 10_000;

        setTokenBalance(truncated);
        console.log("Token Balance:", truncated);

        const status: string = await router.getRouterStatus();
        const satusString = status.toString();
        console.log("Router Is Active:", satusString);

        setRouterStatus(satusString);
      } catch (error) {
        console.log("Getting Token Balance Failed", error);
      }
    };
    getBalance();

    const getAndSetAllowance = async (): Promise<void> => {
      if (!evmWalletExist()) return;
      const signer = await getSigner();
      const provider = getProvider();
      const router = new Contract(selectedRouter, ROUTER_CONTRACT.abi, signer);
      const token = new Contract(tokenAddress, ERC20_CONTRACT.abi, provider);
      try {
        const decimals = await token.decimals();
        const allowance: number = await router.getYieldAllowance(destinationAddress);
        const formatted = parseFloat(formatUnits(allowance, decimals));
        const truncated = Math.round(formatted * 10_000) / 10_000;
        setAllowance(truncated);

        console.log("Allowance", truncated);
      } catch (error) {}
    };
    getAndSetAllowance();
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
          <span className={styles.subTitle}>Active: {routerStatus}</span>
          <span className={styles.subTitle}>
            Destination: ({destinationAddress.slice(0, 6)}...{destinationAddress.slice(-4)})
          </span>
          <span className={styles.subTitle}>Remaining to Route : {allowance} aUSDC</span>

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
