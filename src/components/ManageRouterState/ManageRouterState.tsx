import styles from "./ManageRouterState.module.css";
import { Contract, Log, LogDescription } from "ethers";
import { useState, useEffect } from "react";
import { evmWalletExist, getProvider, getSigner } from "../../lib/Ethers/GetEthers.ts";
import { ROUTER_FACTORY_CONTROLLER_CONTRACT } from "../../lib/Ethers/abi/RouterFactoryController.ts";
import { ROUTER_FACTORY_CONTRACT } from "../../lib/Ethers/abi/RouterFactory.ts";
import { usePersistentState } from "../../store/LocalStorage.ts";
const ManageRouters = () => {
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

  const [selectedFactory, setSelectedFactory] = usePersistentState("selected-factory", "");
  const [selectedRouter, setSelectedRouter] = usePersistentState("selected-router", "");
  const [currencyAddress, setCurrencyAddress] = usePersistentState("currency-address", "");
  const [routerNickname, setRouterNickname] = usePersistentState("router-nickname", "");
  // const [allUserRouters, setUserRouters] = usePersistentState<UserRouterDetails[]>("all-user-routers", []);
  const [ativeUserRouters, setActiveUserRouters] = usePersistentState<UserRouterDetails[]>("active-user-routers", []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setRouterCurrencyAddressOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const address = e.target.value;
    setCurrencyAddress(address);

    console.log("Currency Address:", address);
  };

  const createRouter = async (): Promise<void> => {
    if (!evmWalletExist()) return;
    try {
      const provider = getProvider();
      const signer = await getSigner();
      const controller = new Contract(ROUTER_FACTORY_CONTROLLER_CONTRACT.address, ROUTER_FACTORY_CONTROLLER_CONTRACT.abi, provider);
      const activeFactories: FactoryDetails[] = await controller.getFactories();
      let foundFactory = "";

      activeFactories.forEach((factory: FactoryDetails) => {
        if (factory.yieldBarringTokenAddress.toLowerCase() === currencyAddress.toLowerCase()) {
          foundFactory = factory.factoryAddress;
          setSelectedFactory(foundFactory);
        }
      });

      if (!foundFactory) throw new Error("No factory address selected");

      const routerFactory = new Contract(foundFactory, ROUTER_FACTORY_CONTRACT.abi, signer);
      await routerFactory.createRouter(routerNickname);

      await _setLocalStorageState(foundFactory);
    } catch (error) {
      console.error("Failed to create router:", error);
    }
  };

  const _setLocalStorageState = async (_selectedFactory: string): Promise<void> => {
    if (!evmWalletExist()) return;
    try {
      const signer = await getSigner();
      const userAddress = await signer.getAddress();

      const routerFactory = new Contract(_selectedFactory, ROUTER_FACTORY_CONTRACT.abi, signer);

      const accountRouters: UserRouterDetails[] = await routerFactory.getAccountRouters(userAddress);

      let newRouterIndex: number;
      if (accountRouters.length > 1) {
        newRouterIndex = accountRouters.length - 1;
      } else {
        newRouterIndex = 0;
      }

      const newRouterAddress: string = accountRouters[newRouterIndex].routerAddress;
      const newRouterTokenAddress: string = accountRouters[newRouterIndex].tokenAddress;
      const newRouterNickname: string = accountRouters[newRouterIndex].routerNickname;
      const allUserRouters: UserRouterDetails[] = await routerFactory.getAccountRouters(userAddress);

      setSelectedRouter(newRouterAddress);
      console.log("New router deployed at:", newRouterAddress);
      setCurrencyAddress(newRouterTokenAddress);
      setRouterNickname(newRouterNickname);

      setActiveUserRouters(allUserRouters);
    } catch (error) {}
  };

  useEffect(() => {
    const getUserRouters = async (): Promise<void> => {
      const provider = getProvider();
      const controller = new Contract(ROUTER_FACTORY_CONTROLLER_CONTRACT.address, ROUTER_FACTORY_CONTROLLER_CONTRACT.abi, provider);
      const activeFactories: FactoryDetails[] = await controller.getFactories();

      for (const factory of activeFactories) {
        await _setLocalStorageState(factory.factoryAddress);
      }
    };
    getUserRouters();
  }, []);

  // to display all acitve user's routers
  // const fetchUserRouters = async (): Promise<void> => {
  //   if (!evmWalletExist()) return;

  //   try {
  //     const provider = getProvider();
  //     const signer = await getSigner();
  //     const userAddress = await signer.getAddress();

  //     const factory = new Contract(selectedFactory, ROUTER_FACTORY_CONTRACT.abi, provider);
  //     const activeRouterAddresses: string[] = await factory.getAccountRouters(userAddress);

  //     // Get all stored routers
  //     const storedRouters = useUserRouters.getState().userRouters;

  //     // Match on-chain addresses with local metadata (nickname, ticker)
  //     const activeUserRouters = activeRouterAddresses.map((address) => {
  //       const match = storedRouters.find((r) => r.routerAddress === address && r.userAddress === userAddress);

  //       return {
  //         userAddress,
  //         routerAddress: address,
  //         currencyAddress: currencyAddress,
  //         routerNickname: match?.routerNickname ?? "",
  //         currencyTicker: match?.currencyTicker ?? "",
  //       };
  //     });

  //     setActiveUserRouters(activeUserRouters);
  //     console.log(activeUserRouters);
  //   } catch (error) {
  //     console.error("Failed to fetch user routers:", error);
  //   }
  // };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchUserRouters();
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <div className={styles.buttonContainer}>
        <label htmlFor="modalToggle" className={styles.buttonNewRouter}>
          New Router
        </label>
        <input
          type="checkbox"
          id="modalToggle"
          className={styles.modalToggle}
          hidden
          onChange={(e) => {
            if (e.target.checked) {
              // Modal opened – reset state here
              setCurrencyAddress("");
              setRouterNickname("");
            }
          }}
        />

        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Name Router</h3>

            <input type="text" className={styles.nicknameInput} placeholder="Enter router nickname" value={routerNickname} onChange={(e) => setRouterNickname(e.target.value)} />

            <h3>Choose Currency</h3>

            <select className={styles.selectFactory} value={`${currencyAddress}`} onChange={setRouterCurrencyAddressOnChange}>
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

      <input type="checkbox" id="modalToggle2" className={styles.modalToggle2} hidden />

      <div className={styles.modalOverlay2}>
        <div className={styles.modalContent2}>
          <h3>Choose Router</h3>

          <select value={selectedRouter} onChange={(e) => setSelectedRouter(e.target.value)} className={styles.selectFactory}>
            <option value="" disabled selected hidden>
              Select Router
            </option>
            {ativeUserRouters.map((router) => (
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
