import styles from "./DepositWithdraw.module.css";
import { useEffect, useState } from "react";

import { Contract, MaxUint256 } from "ethers";
import { evmWalletExist, getProvider, getSigner } from "../../lib/Ethers/GetEthers.ts";
import { usePersistentState } from "../../store/LocalStorage.ts";
import { ROUTER_CONTRACT } from "../../lib/Ethers/abi/Router.ts";
import { ERC20_CONTRACT } from "../../lib/Ethers/abi/ERC20.ts";

const DepositWithdraw = () => {
  const [selectedRouter] = usePersistentState("selected-router", "");
  const [tokenAddress] = usePersistentState("currency-address", "");
  const [amount, setAmount] = useState("");

  const deposit = async (): Promise<void> => {
    if (!evmWalletExist()) return;
    const signer = await getSigner();
    const token = new Contract(tokenAddress, ERC20_CONTRACT, signer);
    const router = new Contract(selectedRouter, ROUTER_CONTRACT.abi, signer);
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return console.warn("Invalid number");
    try {
      // approve amount to be transfered
      const approveAmount = await token.approve(selectedRouter, MaxUint256);
      console.log("Approval transaction sent:", approveAmount.hash);
      const receipt = await approveAmount.wait();
      console.log("Transaction confirmed in block:", receipt.blockNumber);
    } catch (error) {
      console.log("Approval failed", error);
    }
    try {
      // deposit
      const deposit = await router.deposit(tokenAddress, numericAmount);
      console.log("Deposit transaction sent:", deposit.hash);
      await deposit.wait();
      console.log("Transaction confirmed in block:", deposit.blockNumber);
    } catch (error) {
      console.log("Deposit failed", error);
    }
  };

  const withdraw = async (): Promise<void> => {
    if (!evmWalletExist()) return;
    const signer = await getSigner();
    const router = new Contract(selectedRouter, ROUTER_CONTRACT.abi, signer);
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) return console.warn("Invalid number");
    try {
      const tx = await router.withdraw(numericAmount);
      console.log("Withdraw transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed in block:", tx.blockNumber);
    } catch (error) {
      console.log("Withdraw failed", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>Deposit/Withdraw</span>
        <div className={styles.buttonContainer}>
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
