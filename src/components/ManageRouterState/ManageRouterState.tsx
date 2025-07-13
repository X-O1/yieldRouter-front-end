import styles from "./ManageRouterState.module.css";
import { Contract } from "ethers";
import { evmWalletExist, getProvider, getSigner } from "../../lib/Ethers/GetEthers.ts";
import { ROUTER_FACTORY_CONTROLLER_CONTRACT } from "../../lib/Ethers/abi/RouterFactoryController.ts";
import { ROUTER_FACTORY_CONTRACT } from "../../lib/Ethers/abi/RouterFactory.ts";
import { useFactoryStore, useUserRoutersStore, useRouterStore } from "../../store/UseRouterState.ts";

const ManageRouters = () => {
  type FactoryDetails = {
    factoryAddress: string;
    yieldBarringTokenAddress: string;
    principalTokenAddress: string;
  };

  const { selectedFactory, setSelectedFactory } = useFactoryStore();
  const { userRouters, setUserRouters } = useUserRoutersStore();
  const { selectedRouter, setSelectedRouter, routerNickname, setRouterNickname, currencyTicker, setCurrencyTicker, currencyAddress, setCurrencyAddress } = useRouterStore();

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [address, ticker] = e.target.value.split(",");
    setCurrencyAddress(address);
    setCurrencyTicker(ticker);

    console.log("Currency Address:", address);
    console.log("Currency Ticker:", ticker);
  };

  const createRouter = async (): Promise<void> => {
    if (evmWalletExist()) {
      const provider = getProvider();
      const controller = new Contract(ROUTER_FACTORY_CONTROLLER_CONTRACT.address, ROUTER_FACTORY_CONTROLLER_CONTRACT.abi, provider);
      try {
        const activeFactories: FactoryDetails[] = await controller.getFactories();

        let foundFactory = "";

        activeFactories.forEach((factory) => {
          if (factory.yieldBarringTokenAddress.toLowerCase() === currencyAddress.toLowerCase()) {
            foundFactory = factory.factoryAddress;
            setSelectedFactory(foundFactory);
            console.log("SelectedFactory:", foundFactory);
          }
        });

        if (!foundFactory) throw new Error("No factory address selected");

        const signer = await getSigner();
        const routerFactory = new Contract(foundFactory, ROUTER_FACTORY_CONTRACT.abi, signer);
        await routerFactory.createRouter();
        // You might want to persist nickname in a separate store or mapping here
      } catch (error) {
        console.error("Failed to create router:", error);
      }
    }
  };

  const fetchUserRouters = async (): Promise<void> => {
    if (!evmWalletExist()) return;

    try {
      const provider = getProvider();
      const signer = await getSigner();
      const userAddress = await signer.getAddress();

      const factory = new Contract(selectedFactory, ROUTER_FACTORY_CONTRACT.abi, provider);
      const routers: string[] = await factory.getAccountRouters(userAddress);
      setUserRouters(routers);
    } catch (error) {
      console.error("Failed to fetch user routers:", error);
    }
  };

  return (
    <>
      <div className={styles.buttonContainer}>
        <label htmlFor="modalToggle" className={styles.buttonNewRouter}>
          New Router
        </label>

        <input type="checkbox" id="modalToggle" className={styles.modalToggle} hidden />

        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Name Router</h3>
            <input type="text" className={styles.nicknameInput} placeholder="Enter router nickname" value={routerNickname} onChange={(e) => setRouterNickname(e.target.value)} />

            <h3>Choose Currency</h3>

            <select className={styles.selectFactory} value={`${currencyAddress},${currencyTicker}`} onChange={handleCurrencyChange}>
              <option value="">Select Currency</option>
              <option value="0x5fbdb2315678afecb367f032d93f642f64180aa3,aUSDC">aUSDC</option>
            </select>

            <br />

            <br />

            <label htmlFor="modalToggle" className={styles.closeBtn}>
              Cancel
            </label>
            <label htmlFor="modalToggle" className={styles.buttonCreateRouter} onClick={createRouter}>
              Create Router
            </label>
          </div>
        </div>

        <label htmlFor="modalToggle2" className={styles.buttonSwitchRouter} onClick={fetchUserRouters}>
          Switch Router
        </label>
      </div>

      <input type="checkbox" id="modalToggle2" className={styles.modalToggle2} hidden />

      <div className={styles.modalOverlay2}>
        <div className={styles.modalContent2}>
          <h3>Choose Router</h3>

          <select value={selectedRouter} onChange={(e) => setSelectedRouter(e.target.value)} className={styles.selectFactory}>
            <option value="" disabled>
              Select Router
            </option>
            {userRouters.map((router) => (
              <option key={router} value={router}>
                {routerNickname ? `${routerNickname} (${router.slice(0, 6)}...${router.slice(-4)})` : router}
              </option>
            ))}
          </select>

          <br />
          <label htmlFor="modalToggle2" className={styles.closeBtn}>
            Cancel
          </label>
          <label htmlFor="modalToggle2" className={styles.buttonCreateRouter}>
            Choose Router
          </label>
        </div>
      </div>
    </>
  );
};

export default ManageRouters;
