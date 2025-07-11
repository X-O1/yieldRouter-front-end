import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [hasWallet, setHasWallet] = useState<boolean>(false);

  // Check for wallet and set initial state
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      setHasWallet(true);

      // Check if already connected
      window.ethereum.request({ method: "eth_accounts" }).then((accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      });

      // Listen for account changes
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress(null);
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, []);

  const handleClick = async () => {
    if (!hasWallet) {
      alert("Please install MetaMask or another EVM wallet.");
      return;
    } else {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error("Wallet connection failed:", err);
      }
    }
  };
  const buttonText = (): string => {
    if (!hasWallet) return "No Wallet";
    if (walletAddress) return `Connected (${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)})`;
    return "Connect";
  };

  return (
    <div className={styles.container}>
      <span className={styles.title}>yieldwield</span>
      <span className={styles.subTitle}>secure yield routing</span>
      <button className={styles.buttonConnect} onClick={handleClick}>
        {buttonText()}
      </button>
    </div>
  );
};

export default Header;
