const ROUTER_CONTRACT = {
  abi: [
    {
      type: "function",
      name: "activateRouter",
      inputs: [
        {
          name: "_destination",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "deactivateRouter",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "deposit",
      inputs: [
        {
          name: "_amountInPrincipalValue",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "getAddress",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getOwnerIndexAdjustedBalance",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getOwnerPrincipalValue",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getOwnerPrincipalYield",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getRouterBalance",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getRouterBalancePrincipalValue",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getRouterCurrentDestination",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getRouterIsActive",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getRouterOwner",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getRouterStatus",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getYieldAllowanceInPrincipalValue",
      inputs: [
        {
          name: "_address",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "initialize",
      inputs: [
        {
          name: "_factoryControllerAddress",
          type: "address",
          internalType: "address",
        },
        {
          name: "_routerFactoryAddress",
          type: "address",
          internalType: "address",
        },
        {
          name: "_addressProvider",
          type: "address",
          internalType: "address",
        },
        {
          name: "_yieldBarringToken",
          type: "address",
          internalType: "address",
        },
        {
          name: "_principalToken",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "isAddressGrantedRouterAccess",
      inputs: [
        {
          name: "_address",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "bool",
          internalType: "bool",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "manageRouterAccess",
      inputs: [
        {
          name: "_account",
          type: "address",
          internalType: "address",
        },
        {
          name: "_grantedYieldAccess",
          type: "bool",
          internalType: "bool",
        },
        {
          name: "_principalYieldAllowance",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "routeYield",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "s_ownerBalances",
      inputs: [
        {
          name: "owner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "principalBalance",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "indexAdjustedBalance",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "principalYield",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "s_routerAccessRecords",
      inputs: [
        {
          name: "addressGrantedAccess",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "grantedYieldAccess",
          type: "bool",
          internalType: "bool",
        },
        {
          name: "principalYieldAllowance",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "setOwner",
      inputs: [
        {
          name: "_owner",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "withdraw",
      inputs: [
        {
          name: "_amountInPrincipalValue",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "event",
      name: "Deposit",
      inputs: [
        {
          name: "account",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "token",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "amount",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "Router_Activated",
      inputs: [
        {
          name: "router",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "Router_Status_Changed",
      inputs: [
        {
          name: "activeStatus",
          type: "bool",
          indexed: true,
          internalType: "bool",
        },
        {
          name: "currentDestination",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "Withdraw",
      inputs: [
        {
          name: "account",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "token",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "amount",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "Yield_Routed",
      inputs: [
        {
          name: "destination",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "amount",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
        {
          name: "routerFee",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "error",
      name: "ACCESS_ALREADY_GRANTED",
      inputs: [],
    },
    {
      type: "error",
      name: "ACCESS_ALREADY_NOT_GRANTED",
      inputs: [],
    },
    {
      type: "error",
      name: "ADDRESS_NOT_GRANTED_YIELD_ACCESS",
      inputs: [],
    },
    {
      type: "error",
      name: "ALREADY_INITIALIZED",
      inputs: [],
    },
    {
      type: "error",
      name: "ALREADY_SET",
      inputs: [],
    },
    {
      type: "error",
      name: "CALLER_MUST_BE_DESTINATION",
      inputs: [],
    },
    {
      type: "error",
      name: "DEPOSIT_FAILED",
      inputs: [],
    },
    {
      type: "error",
      name: "DESTINATION_ADDRESS_NOT_PERMMITTED",
      inputs: [],
    },
    {
      type: "error",
      name: "INPUT_MUST_BE_IN_WAD_UNITS",
      inputs: [],
    },
    {
      type: "error",
      name: "INSUFFICIENT_BALANCE",
      inputs: [],
    },
    {
      type: "error",
      name: "INVALID_INDEX",
      inputs: [],
    },
    {
      type: "error",
      name: "NOT_AUTHORIZED",
      inputs: [],
    },
    {
      type: "error",
      name: "NOT_ENOUGH_YIELD",
      inputs: [],
    },
    {
      type: "error",
      name: "NOT_FACTORY",
      inputs: [],
    },
    {
      type: "error",
      name: "NOT_FACTORY_OWNER",
      inputs: [],
    },
    {
      type: "error",
      name: "NOT_OWNER",
      inputs: [],
    },
    {
      type: "error",
      name: "NOT_PERMITTED_AMOUNT",
      inputs: [],
    },
    {
      type: "error",
      name: "NOT_ROUTER",
      inputs: [],
    },
    {
      type: "error",
      name: "NO_ACTIVE_ROUTERS",
      inputs: [],
    },
    {
      type: "error",
      name: "NO_BALANCE_DEPOSIT_REQUIRED",
      inputs: [],
    },
    {
      type: "error",
      name: "NO_FACTORIES",
      inputs: [],
    },
    {
      type: "error",
      name: "NO_YIELD",
      inputs: [],
    },
    {
      type: "error",
      name: "ROUTER_ACTIVE",
      inputs: [],
    },
    {
      type: "error",
      name: "ROUTER_DESTIONATION_NOT_SET",
      inputs: [],
    },
    {
      type: "error",
      name: "ROUTER_LOCKED",
      inputs: [],
    },
    {
      type: "error",
      name: "ROUTER_MUST_BE_ACTIVE_TO_LOCK",
      inputs: [],
    },
    {
      type: "error",
      name: "ROUTER_NOT_ACTIVE",
      inputs: [],
    },
    {
      type: "error",
      name: "ROUTER_NOT_FOUND",
      inputs: [],
    },
    {
      type: "error",
      name: "ROUTER_NOT_LOCKED",
      inputs: [],
    },
    {
      type: "error",
      name: "TOKEN_ALLOWANCE",
      inputs: [],
    },
    {
      type: "error",
      name: "TOKEN_NOT_PERMITTED",
      inputs: [],
    },
    {
      type: "error",
      name: "WITHDRAW_FAILED",
      inputs: [],
    },
  ],
};

export { ROUTER_CONTRACT };
