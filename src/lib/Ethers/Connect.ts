import { BrowserProvider } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const connectWallet = async (): Promise<string[]> => {
  if (!window.ethereum) throw new Error("No wallet found");
  return await window.ethereum.request({ method: "eth_requestAccounts" });
};

const getProvider = (): BrowserProvider => {
  if (!window.ethereum) throw new Error("No Ethereum provider");
  return new BrowserProvider(window.ethereum);
};

const getSigner = async () => {
  const provider = getProvider();
  return await provider.getSigner();
};

const getNetwork = async () => {
  const provider = getProvider();
  return await provider.getNetwork();
};

export { connectWallet, getProvider, getSigner, getNetwork };
