import styles from "./AccessControl.module.css";
import { useState } from "react";
import { Contract, parseUnits } from "ethers";
import { evmWalletExist, getSigner } from "../../lib/Ethers/GetEthers.ts";
import { usePersistentState } from "../../store/LocalStorage.ts";
import { ROUTER_CONTRACT } from "../../lib/Ethers/abi/Router.ts";
import { ERC20_CONTRACT } from "../../lib/Ethers/abi/ERC20.ts";

const AccessControl = () => {
  type AccessControl = {
    address: string;
    yieldAllowance: string;
  };
  const [selectedRouter] = usePersistentState<string>("selected-router", "");
  const [, /*addressBook */ setAddressBook] = usePersistentState<AccessControl[]>("address-book", []);

  const [addressGrantedAccess, setAddressGrantedAccess] = useState<string>("");
  const [addressAllowance, setAddressAllowance] = useState<string>("");
  const [tokenAddress] = usePersistentState<string>("currency-address", "");

  const addAddressAndAllowanceToAddressBook = async (): Promise<void> => {
    try {
      setAddressBook((prev) => [
        ...prev,
        {
          address: addressGrantedAccess,
          yieldAllowance: addressAllowance,
        },
      ]);
      setAddressGrantedAccess("");
      setAddressAllowance("");
    } catch (error) {
      console.log("Adding address to address book failed", error);
    }
  };

  const removeAddressAndAllowanceToAddressBook = async (): Promise<void> => {
    try {
      setAddressBook((prev) => prev.filter((entry) => entry.address !== addressGrantedAccess));
      setAddressGrantedAccess("");
      setAddressAllowance("");
    } catch (error) {
      console.log("Removing address from address book failed", error);
    }
  };

  const grantAccess = async (): Promise<void> => {
    if (!evmWalletExist()) return;
    const signer = await getSigner();
    const router = new Contract(selectedRouter, ROUTER_CONTRACT.abi, signer);
    const token = new Contract(tokenAddress, ERC20_CONTRACT.abi, signer);

    try {
      if (isNaN(parseFloat(addressAllowance))) return console.warn("Invalid number");
      const decimals = await token.decimals();
      const amt = parseUnits(addressAllowance, decimals);

      const tx = await router.manageRouterAccess(addressGrantedAccess, true, amt);
      console.log("Manage Access transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed in block:", tx.blockNumber);
      await addAddressAndAllowanceToAddressBook();
    } catch (error) {
      console.log("Adding Access failed", error);
    }
  };

  const removeAccess = async (): Promise<void> => {
    if (!evmWalletExist()) return;
    const signer = await getSigner();
    const router = new Contract(selectedRouter, ROUTER_CONTRACT.abi, signer);
    const token = new Contract(tokenAddress, ERC20_CONTRACT.abi, signer);

    try {
      if (isNaN(parseFloat(addressAllowance))) return console.warn("Invalid number");
      const decimals = await token.decimals();
      const amt = parseUnits(addressAllowance, decimals);

      const tx = await router.manageRouterAccess(addressGrantedAccess, false, amt);
      console.log("Manage Access transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed in block:", tx.blockNumber);
      removeAddressAndAllowanceToAddressBook();
    } catch (error) {
      console.log("Removing access failed", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>Access Control</span>
        <span className={styles.log}>@0x1234... granted access</span>

        <div className={styles.inputContainer}>
          <input className={styles.addressInput} type="text" placeholder="Enter address" value={addressGrantedAccess} onChange={(e) => setAddressGrantedAccess(e.target.value)} />
          <input className={styles.allowanceInput} type="text" placeholder="Enter allowance" value={addressAllowance} onChange={(e) => setAddressAllowance(e.target.value)} />
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.buttonAddAddress} onClick={grantAccess}>
            Add Address
          </button>
          <button className={styles.button} onClick={removeAccess}>
            Remove Address
          </button>
        </div>
      </div>
    </>
  );
};

export default AccessControl;
