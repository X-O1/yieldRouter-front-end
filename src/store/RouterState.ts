import { useState, useEffect } from "react";

// ======================= Types =======================
type UserRouterDetails = {
  userAddress: string;
  routerAddress: string;
  currencyAddress: string;
  routerNickname: string;
  currencyTicker: string;
};

// ======================= Helpers =======================
const getStored = <T>(key: string, fallback: T): T => {
  const stored = localStorage.getItem(key);
  try {
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const setStored = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// ======================= Hooks =======================
const useSelectedFactory = () => {
  const [selectedFactory, setSelectedFactory] = useState(() => localStorage.getItem("selected-factory") || "");

  useEffect(() => {
    localStorage.setItem("selected-factory", selectedFactory);
  }, [selectedFactory]);

  return { selectedFactory, setSelectedFactory };
};

const useSelectedRouter = () => {
  const [selectedRouter, setSelectedRouter] = useState(() => localStorage.getItem("selected-router") || "");
  const [currencyAddress, setCurrencyAddress] = useState(() => localStorage.getItem("currency-address") || "");

  useEffect(() => {
    localStorage.setItem("selected-router", selectedRouter);
  }, [selectedRouter]);

  useEffect(() => {
    localStorage.setItem("currency-address", currencyAddress);
  }, [currencyAddress]);

  return { selectedRouter, setSelectedRouter, currencyAddress, setCurrencyAddress };
};

const useSelectedRouterLocal = () => {
  const [routerNickname, setRouterNickname] = useState(() => localStorage.getItem("router-nickname") || "");
  const [currencyTicker, setCurrencyTicker] = useState(() => localStorage.getItem("currency-ticker") || "");

  useEffect(() => {
    localStorage.setItem("router-nickname", routerNickname);
  }, [routerNickname]);

  useEffect(() => {
    localStorage.setItem("currency-ticker", currencyTicker);
  }, [currencyTicker]);

  return { routerNickname, setRouterNickname, currencyTicker, setCurrencyTicker };
};

const useUserRouters = () => {
  const [userRouters, setUserRouters] = useState<UserRouterDetails[]>(() => getStored<UserRouterDetails[]>("user-router-list", []));

  const addUserRouter = (router: UserRouterDetails) => {
    setUserRouters((prev) => {
      const exists = prev.some((r) => r.routerAddress === router.routerAddress);
      const updated = exists ? prev : [...prev, router];
      setStored("user-router-list", updated);
      return updated;
    });
  };

  const clearUserRouters = () => {
    setUserRouters([]);
    localStorage.removeItem("user-router-list");
  };

  return { userRouters, addUserRouter, clearUserRouters };
};

// ======================= Exports =======================

export { useSelectedFactory, useSelectedRouter, useSelectedRouterLocal, useUserRouters, type UserRouterDetails };
