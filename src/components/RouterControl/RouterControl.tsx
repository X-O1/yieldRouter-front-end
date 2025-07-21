import styles from "./RouterControl.module.css";
import { Contract, parseUnits } from "ethers";

import { evmWalletExist, getSigner } from "../../lib/Ethers/GetEthers.ts";
import { usePersistentState } from "../../store/LocalStorage.ts";
import { ROUTER_CONTRACT } from "../../lib/Ethers/abi/Router.ts";
import { MOCK_POOL_CONTRACT } from "../../lib/Ethers/abi/MockPool.ts";
import { ROUTER_FACTORY_CONTRACT } from "../../lib/Ethers/abi/RouterFactory.ts";

import { ERC20_CONTRACT } from "../../lib/Ethers/abi/ERC20.ts";

const RouterControl = () => {
  type AccessControl = {
    address: string;
    yieldAllowance: string;
  };
  const [selectedRouter] = usePersistentState<string>("selected-router", "");
  const [addressBook /*setAddressBook*/] = usePersistentState<AccessControl[]>("address-book", []);
  const [destinationAddress, setDestinationAddress] = usePersistentState("destination-address", "");
  const [tokenAddress] = usePersistentState<string>("currency-address", "");
  const [selectedFactory /*setSelectedFactory*/] = usePersistentState("selected-factory", "");

  const activate = async (): Promise<void> => {
    if (!evmWalletExist()) return;
    const signer = await getSigner();
    const router = new Contract(selectedRouter, ROUTER_CONTRACT.abi, signer);
    try {
      const tx = await router.activateRouter(destinationAddress);
      console.log("Activate router transaction sent:", tx.hash);

      await tx.wait();
      console.log("Transaction confirmed in block:", tx.blockNumber);

      const tx2: string = await router.getRouterStatus();
      console.log("Router Is Active:", tx2);
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

      const tx2: string = await router.getRouterStatus();
      console.log("Router Is Active:", tx2);
    } catch (error) {
      console.log("Deactivating Router failed", error);
    }
  };

  // for testing
  const routeYield = async (): Promise<void> => {
    if (!evmWalletExist()) return;
    const signer = await getSigner();
    const routerFactory = new Contract(selectedFactory, ROUTER_FACTORY_CONTRACT.abi, signer);
    // const router = new Contract(selectedRouter, ROUTER_CONTRACT.abi, signer);

    try {
      const tx = await routerFactory.activateActiveRouters({ gasLimit: 2_000_000 });
      console.log("Routing Yield transaction sent:", tx.hash);

      await tx.wait();
      console.log("Transaction confirmed in block:", tx.blockNumber);

      // const tx3: string = await router.getOwnerYield();
      // console.log("Owner Yield:", tx3);
    } catch (error) {
      console.log("Routing Yield failed", error);
    }
  };

  const changeIndex = async (): Promise<void> => {
    if (!evmWalletExist()) return;
    const signer = await getSigner();
    const pool = new Contract(MOCK_POOL_CONTRACT.address, MOCK_POOL_CONTRACT.abi, signer);
    const router = new Contract(selectedRouter, ROUTER_CONTRACT.abi, signer);
    const token = new Contract(tokenAddress, ERC20_CONTRACT.abi, signer);
    const routerFactory = new Contract(selectedFactory, ROUTER_FACTORY_CONTRACT.abi, signer);

    try {
      const amt = parseUnits("2", 27);

      const tx = await pool.setLiquidityIndex(amt);
      console.log("Pool transaction sent:", tx.hash);

      await tx.wait();
      console.log("Transaction confirmed in block:", tx.blockNumber);

      const tx2: string = await pool.getIndex();

      console.log("Index is:", tx2);

      const tx3: string = await router.getOwnerYield();
      console.log("Owner Yield:", tx3);

      const tx4: string = await token.balanceOf(selectedRouter);
      console.log("Router Balance:", tx4);

      const tx5: string = await routerFactory.getActiveRouters();
      console.log("Active Routers:", tx5);
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
