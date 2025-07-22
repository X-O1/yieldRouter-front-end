import styles from "./DepositWithdraw.module.css";
import { useState } from "react";
import { Contract, MaxUint256, parseUnits, formatUnits } from "ethers";
import { evmWalletExist, getSigner, getProvider } from "../../lib/Ethers/GetEthers.ts";
import { usePersistentState } from "../../store/LocalStorage.ts";
import { ROUTER_CONTRACT } from "../../lib/Ethers/abi/Router.ts";
import { ERC20_CONTRACT } from "../../lib/Ethers/abi/ERC20.ts";

const DepositWithdraw = () => {
  const [selectedRouter] = usePersistentState<string>("selected-router", "");
  const [tokenAddress] = usePersistentState<string>("currency-address", "");
  const [amount, setAmount] = useState<string>("");
  const [, /*tokenBalance */ setTokenBalance] = usePersistentState<number>("token-balance", 0);

  const approveMaxAmount = async (): Promise<void> => {
    if (!evmWalletExist()) return;
    try {
      console.log(selectedRouter);
      console.log(tokenAddress);
      const signer = await getSigner();
      const token = new Contract(tokenAddress, ERC20_CONTRACT.abi, signer);

      const tx = await token.approve(selectedRouter, MaxUint256);
      console.log(`Approval tx sent: ${tx.hash}`);

      const receipt = await tx.wait();
      console.log(`Confirmed in block: ${receipt.blockNumber}`);
    } catch (err) {
      console.warn("Approval failed:", err);
    }
  };

  const deposit = async (): Promise<void> => {
    if (!evmWalletExist()) return;
    const signer = await getSigner();
    const router = new Contract(selectedRouter, ROUTER_CONTRACT.abi, signer);
    const token = new Contract(tokenAddress, ERC20_CONTRACT.abi, signer);

    try {
      if (isNaN(parseFloat(amount))) return console.warn("Invalid number");
      const decimals = await token.decimals();
      const amt = parseUnits(amount, decimals);

      const tx = await router.deposit(amt);
      console.log("Deposit transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed in block:", tx.blockNumber);

      await getBalance();
    } catch (error) {
      console.log("Deposit failed", error);
    }
  };

  const withdraw = async (): Promise<void> => {
    if (!evmWalletExist()) return;
    const signer = await getSigner();
    const router = new Contract(selectedRouter, ROUTER_CONTRACT.abi, signer);
    const token = new Contract(tokenAddress, ERC20_CONTRACT.abi, signer);

    try {
      if (isNaN(parseFloat(amount))) return console.warn("Invalid number");
      const decimals = await token.decimals();
      const amt = parseUnits(amount, decimals);

      const tx = await router.withdraw(amt);
      console.log("Withdraw transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed in block:", tx.blockNumber);
      await getBalance();
    } catch (error) {
      console.log("Withdraw failed", error);
    }
  };

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

  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>Deposit/Withdraw</span>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonGrantTokenAccess} onClick={approveMaxAmount}>
            Grant Token Access
          </button>

          <input className={styles.amount} type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <button className={styles.buttonDeposit} onClick={deposit}>
            Deposit
          </button>
          <button className={styles.button} onClick={withdraw}>
            Withdraw
          </button>
        </div>
      </div>
    </>
  );
};

export default DepositWithdraw;
