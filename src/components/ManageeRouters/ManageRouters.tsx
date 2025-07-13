import styles from "./ManageRouters.module.css";
import { useState } from "react";
import { Contract } from "ethers";
import { evmWalletExist, getProvider, getSigner } from "../../lib/Ethers/GetEthers.ts";
import { ROUTER_FACTORY_CONTROLLER_CONTRACT } from "../../lib/Ethers/abi/RouterFactoryController.ts";
import { ROUTER_FACTORY_CONTRACT } from "../../lib/Ethers/abi/RouterFactory.ts";

const ManageRouters = () => {
  type FactoryDetails = {
    factoryAddress: string;
    yieldBarringTokenAddress: string;
    principalTokenAddress: string;
  };

  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [selectedFactoryAddress, setSelectedFactoryAddress] = useState<string>("");

  const setCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(event.target.value);
    console.log("Selected:", event.target.value);
  };

  const factoryDetails: FactoryDetails[] = [];

  const fetchSelectedCurrencyRouterFactoryAddress = async (): Promise<void> => {
    const provider = getProvider();
    const controller = new Contract(ROUTER_FACTORY_CONTROLLER_CONTRACT.address, ROUTER_FACTORY_CONTROLLER_CONTRACT.abi, provider);
    try {
      const activeFactories: FactoryDetails[] = await controller.getFactories();

      activeFactories.forEach((factory) => {
        if (factory.yieldBarringTokenAddress.toLowerCase() === selectedCurrency.toLowerCase()) {
          setSelectedFactoryAddress(factory.factoryAddress);
          console.log("SelectedFactory:", factory.factoryAddress);
        }
      });
    } catch (error) {
      console.error("Failed to fetch factory details:", error);
    }
  };

  const createRouter = async (): Promise<void> => {
    if (evmWalletExist()) {
      try {
        await fetchSelectedCurrencyRouterFactoryAddress();
        const factoryAddress = selectedFactoryAddress;
        if (!factoryAddress) throw new Error("No factory address selected");

        const signer = await getSigner();
        const routerFactory = new Contract(factoryAddress, ROUTER_FACTORY_CONTRACT.abi, signer);

        await routerFactory.createRouter();
      } catch (error) {
        console.error("Failed to create router:", error);
      }
    }
  };

  return (
    <>
      <div className={styles.buttonContainer}>
        <button className={styles.buttonCreateRouter} onClick={fetchSelectedCurrencyRouterFactoryAddress}>
          Create Router
        </button>
        <select className={styles.selectFactory} value={selectedCurrency} onChange={setCurrency}>
          <option disabled selected>
            Select Currency
          </option>
          <option></option>

          <option value={"0x5fbdb2315678afecb367f032d93f642f64180aa3"}>aUSDC</option>
          <option>aUSDT</option>
        </select>
        <button className={styles.buttonSwitchRouter}>Switch Router</button>
      </div>
    </>
  );
};

export default ManageRouters;
