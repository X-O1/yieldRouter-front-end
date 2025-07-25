import styles from "./RouterControl.module.css";
import { Contract, parseUnits, formatUnits } from "ethers";
import { evmWalletExist, getSigner, getProvider } from "../../lib/Ethers/GetEthers.ts";
import { usePersistentState } from "../../store/LocalStorage.ts";
import { ROUTER_CONTRACT } from "../../lib/Ethers/abi/Router.ts";
import { MOCK_POOL_CONTRACT } from "../../lib/Ethers/abi/MockPool.ts";
import { ROUTER_FACTORY_CONTRACT } from "../../lib/Ethers/abi/RouterFactory.ts";
import { ERC20_CONTRACT } from "../../lib/Ethers/abi/ERC20.ts";

const RouterControl = () => {
  const [selectedRouter] = usePersistentState<string>("selected-router", "");
  const [addressBook] = usePersistentState<string[]>("address-book", []);

  const [destinationAddress, setDestinationAddress] = usePersistentState("destination-address", "");
  const [tokenAddress] = usePersistentState<string>("currency-address", "");
  const [selectedFactory /*setSelectedFactory*/] = usePersistentState("selected-factory", "");
  const [, /*allowance*/ setAllowance] = usePersistentState<number>("allowance", 0);
  const [, /*routerStatus*/ setRouterStatus] = usePersistentState<string>("router-status", "");

  const activate = async (): Promise<void> => {
    if (!evmWalletExist()) return;
    const signer = await getSigner();
    const router = new Contract(selectedRouter, ROUTER_CONTRACT.abi, signer);
    try {
      const tx = await router.activateRouter(destinationAddress);
      console.log("Activate router transaction sent:", tx.hash);
      await tx.wait();
      console.log("Transaction confirmed in block:", tx.blockNumber);

      const status: string = await router.getRouterStatus();
      const satusString = status.toString();
      console.log("Router Is Active:", satusString);

      setRouterStatus(satusString);
      await getAndSetAllowance();
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

      const status: string = await router.getRouterStatus();
      const satusString = status.toString();
      console.log("Router Is Active:", satusString);

      setRouterStatus(satusString);
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
      const tx = await routerFactory.activateActiveRouters({ gasLimit: 1_000_000 });
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

  return (
    <>
      <div className={styles.container}>
        <span className={styles.title}>Router Control</span>

        <select
          value={destinationAddress}
          onChange={(e) => {
            setDestinationAddress(e.target.value);
          }}
          className={styles.selectDestination}
        >
          <option value="" disabled hidden>
            Select Destination
          </option>

          {addressBook.map((entry) => (
            <option key={entry} value={entry}>
              {entry ? `Address: (${entry.slice(0, 6)}...${entry.slice(-4)})` : entry}
            </option>
          ))}
        </select>

        <div className={styles.buttonContainer}>
          <button
            className={styles.buttonActivate}
            onClick={async () => {
              await getAndSetAllowance(), activate();
            }}
          >
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
