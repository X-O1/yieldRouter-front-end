import { useEffect, useState } from "react";
import { Contract } from "ethers";
import styles from "./ManageRouterState.module.css";
import { evmWalletExist, getProvider, getSigner } from "../../lib/Ethers/GetEthers.ts";
import { ROUTER_FACTORY_CONTROLLER_CONTRACT } from "../../lib/Ethers/abi/RouterFactoryController.ts";
import { ROUTER_FACTORY_CONTRACT } from "../../lib/Ethers/abi/RouterFactory.ts";
import { usePersistentState } from "../../store/LocalStorage.ts";

// ======================= Types =======================
type FactoryDetails = {
  factoryAddress: string;
  yieldBarringTokenAddress: string;
  principalTokenAddress: string;
};

type UserRouterDetails = {
  userAddress: string;
  routerAddress: string;
  tokenAddress: string;
  routerNickname: string;
};

const ManageRouters = () => {
  // ======================= State =======================
  const [, /*selectedFactory*/ setSelectedFactory] = usePersistentState("selected-factory", "");
  const [selectedRouter, setSelectedRouter] = usePersistentState("selected-router", "");
  const [currencyAddress, setCurrencyAddress] = usePersistentState("currency-address", "");
  const [routerNickname, setRouterNickname] = usePersistentState("router-nickname", "");
  const [activeUserRouters, setActiveUserRouters] = usePersistentState<UserRouterDetails[]>("active-user-routers", []);
  const [, /*isModalOpen*/ setIsModalOpen] = useState(false);

  // ======================= Effects =======================
  useEffect(() => {
    const getUserRouters = async () => {
      const provider = getProvider();
      const controller = new Contract(ROUTER_FACTORY_CONTROLLER_CONTRACT.address, ROUTER_FACTORY_CONTROLLER_CONTRACT.abi, provider);
      const activeFactories: FactoryDetails[] = await controller.getFactories();

      for (const factory of activeFactories) {
        await _setLocalStorageState(factory.factoryAddress);
      }
    };

    getUserRouters();
  }, []);

  // ======================= Handlers =======================
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const address = e.target.value;
    setCurrencyAddress(address);
    console.log("Currency Address:", address);
  };

  const handleModalToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsModalOpen(e.target.checked);
    if (!e.target.checked) {
      setCurrencyAddress("");
      setRouterNickname("");
    }
  };

  // ======================= Router Logic =======================
  const _setLocalStorageState = async (factoryAddr: string): Promise<void> => {
    if (!evmWalletExist()) return;

    try {
      const signer = await getSigner();
      const userAddress = await signer.getAddress();
      const routerFactory = new Contract(factoryAddr, ROUTER_FACTORY_CONTRACT.abi, signer);

      const routers: UserRouterDetails[] = await routerFactory.getAccountRouters(userAddress);

      const lastRouter = routers[routers.length - 1];

      setSelectedRouter(lastRouter.routerAddress);
      setCurrencyAddress(lastRouter.tokenAddress);
      setRouterNickname(lastRouter.routerNickname);
      setActiveUserRouters(routers);

      console.log("New router deployed at:", lastRouter.routerAddress);
    } catch (err) {
      console.error("Failed to set local storage state:", err);
    }
  };

  const createRouter = async (): Promise<void> => {
    if (!evmWalletExist()) return;

    try {
      const provider = getProvider();
      const signer = await getSigner();
      const controller = new Contract(ROUTER_FACTORY_CONTROLLER_CONTRACT.address, ROUTER_FACTORY_CONTROLLER_CONTRACT.abi, provider);
      const factories: FactoryDetails[] = await controller.getFactories();

      let foundFactory = "";
      for (const factory of factories) {
        if (factory.yieldBarringTokenAddress.toLowerCase() === currencyAddress.toLowerCase()) {
          foundFactory = factory.factoryAddress;
          setSelectedFactory(foundFactory);
          break;
        }
      }

      if (!foundFactory) throw new Error("No factory address selected");

      const routerFactory = new Contract(foundFactory, ROUTER_FACTORY_CONTRACT.abi, signer);
      await routerFactory.createRouter(routerNickname);

      await _setLocalStorageState(foundFactory);
    } catch (error) {
      console.error("Failed to create router:", error);
    }
  };

  // ======================= UI =======================
  return (
    <>
      {/* New Router Modal */}
      <div className={styles.buttonContainer}>
        <label htmlFor="modalToggle" className={styles.buttonNewRouter}>
          New Router
        </label>

        <input type="checkbox" id="modalToggle" className={styles.modalToggle} hidden onChange={handleModalToggle} />

        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Name Router</h3>
            <input type="text" className={styles.nicknameInput} placeholder="Enter router nickname" value={routerNickname} onChange={(e) => setRouterNickname(e.target.value)} />

            <h3>Choose Currency</h3>
            <select className={styles.selectFactory} value={currencyAddress} onChange={handleCurrencyChange}>
              <option value="" disabled>
                Select Currency
              </option>
              <option value="0x5fbdb2315678afecb367f032d93f642f64180aa3">aUSDC</option>
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

        <label htmlFor="modalToggle2" className={styles.buttonSwitchRouter}>
          Switch Router
        </label>
      </div>

      {/* Switch Router Modal */}
      <input type="checkbox" id="modalToggle2" className={styles.modalToggle2} hidden />

      <div className={styles.modalOverlay2}>
        <div className={styles.modalContent2}>
          <h3>Choose Router</h3>
          <select value={selectedRouter} onChange={(e) => setSelectedRouter(e.target.value)} className={styles.selectFactory}>
            <option value="" disabled hidden>
              Select Router
            </option>
            {activeUserRouters.map((router) => (
              <option key={router.routerAddress} value={router.routerAddress}>
                {router.routerNickname ? `${router.routerNickname} (${router.routerAddress.slice(0, 6)}...${router.routerAddress.slice(-4)})` : router.routerAddress}
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
