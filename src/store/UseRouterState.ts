import { create } from "zustand";
import { persist } from "zustand/middleware";

// ======================= Types =======================

type StoreSelectedFactory = {
  selectedFactory: string;
  setSelectedFactory: (factory: string) => void;
};

type StoreSelectedRouterLocal = {
  routerNickname: string;
  currencyTicker: string;
  setRouterNickname: (nickname: string) => void;
  setCurrencyTicker: (currencyTicker: string) => void;
};

type StoreSelectedRouter = {
  selectedRouter: string;
  currencyAddress: string;
  setSelectedRouter: (router: string) => void;
  setCurrencyAddress: (currencyAddress: string) => void;
};

type UserRouterDetails = {
  userAddress: string;
  routerAddress: string;
  currencyAddress: string;
  routerNickname: string;
  currencyTicker: string;
};

type StoreUserRouters = {
  userRouters: UserRouterDetails[];
  addUserRouter: (router: UserRouterDetails) => void;
  clearUserRouters: () => void;
};

// ======================= Stores =======================

const useSelectedFactory = create<StoreSelectedFactory>((set) => ({
  selectedFactory: "",
  setSelectedFactory: (factory) => set({ selectedFactory: factory }),
}));

const useSelectedRouterLocal = create<StoreSelectedRouterLocal>()(
  persist(
    (set) => ({
      routerNickname: "",
      currencyTicker: "",
      setRouterNickname: (nickname) => set({ routerNickname: nickname }),
      setCurrencyTicker: (ticker) => set({ currencyTicker: ticker }),
    }),
    {
      name: "selected-router-local", // localStorage key
    }
  )
);

const useSelectedRouter = create<StoreSelectedRouter>()(
  persist(
    (set) => ({
      selectedRouter: "",
      currencyAddress: "",
      setSelectedRouter: (router) => set({ selectedRouter: router }),
      setCurrencyAddress: (address) => set({ currencyAddress: address }),
    }),
    {
      name: "selected-router", // localStorage key
    }
  )
);

const useUserRouters = create<StoreUserRouters>()(
  persist(
    (set) => ({
      userRouters: [],
      addUserRouter: (router) =>
        set((state) => {
          const exists = state.userRouters.some((r) => r.routerAddress === router.routerAddress);
          return exists ? state : { userRouters: [...state.userRouters, router] };
        }),
      clearUserRouters: () => set({ userRouters: [] }),
    }),
    {
      name: "user-router-list", // localStorage key
    }
  )
);

// ======================= Export =======================

export { useSelectedFactory, useSelectedRouter, useSelectedRouterLocal, useUserRouters, type UserRouterDetails };
