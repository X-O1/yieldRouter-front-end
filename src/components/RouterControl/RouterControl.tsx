import styles from "./RouterControl.module.css";
import { Contract } from "ethers";
import { evmWalletExist, getSigner } from "../../lib/Ethers/GetEthers.ts";
import { usePersistentState } from "../../store/LocalStorage.ts";
import { ROUTER_CONTRACT } from "../../lib/Ethers/abi/Router.ts";
import { MOCK_POOL_CONTRACT } from "../../lib/Ethers/abi/MockPool.ts";
import { ROUTER_FACTORY_CONTROLLER_CONTRACT } from "../../lib/Ethers/abi/RouterFactoryController.ts";

const RouterControl = () => {
  type AccessControl = {
    address: string;
    yieldAllowance: string;
  };
  const [selectedRouter] = usePersistentState<string>("selected-router", "");
  const [addressBook /*setAddressBook*/] = usePersistentState<AccessControl[]>("address-book", []);
  const [destinationAddress, setDestinationAddress] = usePersistentState("destination-address", "");

  const activate = async (): Promise<void> => {
    if (!evmWalletExist()) return;
    const signer = await getSigner();
    const router = new Contract(selectedRouter, ROUTER_CONTRACT.abi, signer);
    try {
      const tx = await router.activateRouter(destinationAddress);
      console.log("Activate router transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed in block:", tx.blockNumber);
    } catch (error) {
      console.log("Activating Router failed", error);
    }
  };

  const deactivate = async (): Promise<void> => {
    if (!evmWalletExist()) return;
    const signer = await getSigner();
    const router = new Contract(selectedRouter, ROUTER_CONTRACT.abi, signer);
    try {
      const tx = await router.deactivateRouter();
      console.log("Deactivate router transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed in block:", tx.blockNumber);
    } catch (error) {
      console.log("Deactivating Router failed", error);
    }
  };

  // for testing
  const routeYield = async (): Promise<void> => {
    if (!evmWalletExist()) return;
    const signer = await getSigner();
    const controller = new Contract(ROUTER_FACTORY_CONTROLLER_CONTRACT.address, ROUTER_FACTORY_CONTROLLER_CONTRACT.abi, signer);
    try {
      const tx = await controller.triggerYieldRouting();
      console.log("Routing Yield transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed in block:", tx.blockNumber);
    } catch (error) {
      console.log("Routing Yield failed", error);
    }
  };

  const changeIndex = async (): Promise<void> => {
    if (!evmWalletExist()) return;
    const signer = await getSigner();
    const pool = new Contract(MOCK_POOL_CONTRACT.address, MOCK_POOL_CONTRACT.abi, signer);
    try {
      const tx = await pool.setLiquidityIndex(2e27);
      console.log("Pool transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed in block:", tx.blockNumber);
    } catch (error) {
      console.log("Changing index failed", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>Router Control</span>

        <select value={destinationAddress} onChange={(e) => setDestinationAddress(e.target.value)} className={styles.selectDestination}>
          <option value="" disabled hidden>
            Select Destination
          </option>
          {addressBook.map((entry) => (
            <option key={entry.address} value={entry.address}>
              {entry.yieldAllowance ? `Address: (${entry.address.slice(0, 6)}...${entry.address.slice(-4)}) Allowance: ${entry.yieldAllowance} ` : entry.address}
            </option>
          ))}
        </select>

        <div className={styles.buttonContainer}>
          <button className={styles.buttonActivate} onClick={activate}>
            Activate Router
          </button>
          <button className={styles.buttonDeactivate} onClick={deactivate}>
            Deactivate Router
          </button>
        </div>
        <button className={styles.buttonRouteYield} onClick={routeYield}>
          Route Yield
        </button>
        <button className={styles.buttonRouteYield} onClick={changeIndex}>
          Change Index
        </button>
      </div>
    </>
  );
};

export default RouterControl;
