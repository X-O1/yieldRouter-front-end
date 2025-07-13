import { BrowserProvider, JsonRpcSigner } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const evmWalletExist = (): boolean => {
  const exist = typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  return exist;
};
const getProvider = (): BrowserProvider => {
  if (!window.ethereum) throw new Error("No Ethereum provider");
  return new BrowserProvider(window.ethereum);
};

const getSigner = async (): Promise<JsonRpcSigner> => {
  const provider = getProvider();
  return await provider.getSigner(); // this is correct
};

const getNetwork = async () => {
  const provider = getProvider();
  return await provider.getNetwork();
};

export { evmWalletExist, getProvider, getSigner, getNetwork };
