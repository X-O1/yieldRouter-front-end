import { create } from "zustand";

type FactoryStore = {
  selectedFactory: string;
  setSelectedFactory: (factory: string) => void;
};

type UserRoutersStore = {
  userRouters: string[];
  setUserRouters: (routers: string[]) => void;
  clearUserRouters: () => void;
};

type RouterStore = {
  selectedRouter: string;
  routerNickname: string;
  currencyTicker: string;
  currencyAddress: string;
  setSelectedRouter: (router: string) => void;
  setRouterNickname: (nickname: string) => void;
  setCurrencyTicker: (currencyTicker: string) => void;
  setCurrencyAddress: (currencyAddress: string) => void;
};

const useFactoryStore = create<FactoryStore>((set) => ({
  selectedFactory: "",
  setSelectedFactory: (factory) => set({ selectedFactory: factory }),
}));

const useUserRoutersStore = create<UserRoutersStore>((set) => ({
  userRouters: [],
  setUserRouters: (routers) => set({ userRouters: routers }),
  clearUserRouters: () => set({ userRouters: [] }),
}));

const useRouterStore = create<RouterStore>((set) => ({
  selectedRouter: "",
  routerNickname: "",
  currencyTicker: "",
  currencyAddress: "",
  setSelectedRouter: (router) => set({ selectedRouter: router }),
  setRouterNickname: (nickname) => set({ routerNickname: nickname }),
  setCurrencyTicker: (ticker) => set({ currencyTicker: ticker }),
  setCurrencyAddress: (address) => set({ currencyAddress: address }),
}));

export { useFactoryStore, useUserRoutersStore, useRouterStore };
