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
          name: "_yieldTokenAmount",
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
      name: "getAddressBook",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address[]",
          internalType: "address[]",
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
      name: "getOwnerPrincipalBalance",
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
      name: "getOwnerYield",
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
      name: "getYieldAllowance",
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
        {
          name: "_yieldTokenDecimals",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "_principalTokenDecimals",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "manageRouterAllowance",
      inputs: [
        {
          name: "_account",
          type: "address",
          internalType: "address",
        },
        {
          name: "_allowance",
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
      name: "s_addressBook",
      inputs: [
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
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
          name: "yieldTokenBalance",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "indexAdjustedBalance",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "principalBalance",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "yield",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "s_principalTokenDecimals",
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
      name: "s_routerAllowances",
      inputs: [
        {
          name: "account",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "allowance",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "s_yieldTokenDecimals",
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
          name: "_yieldTokenAmount",
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
      name: "ADDRESS_HAS_NO_ALLOWANCE",
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
      name: "DEPOSIT_FAILED",
      inputs: [],
    },
    {
      type: "error",
      name: "FEE_TRANSFER_FAILED",
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
      name: "MUST_BE_GREATER_THAN_0",
      inputs: [],
    },
    {
      type: "error",
      name: "NOT_OWNER",
      inputs: [],
    },
    {
      type: "error",
      name: "NO_BALANCE_DEPOSIT_REQUIRED",
      inputs: [],
    },
    {
      type: "error",
      name: "NO_YIELD",
      inputs: [],
    },
    {
      type: "error",
      name: "OVERFLOW_UNDERFLOW",
      inputs: [],
    },
    {
      type: "error",
      name: "POOL_WITHDRAW_FAILED",
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
      name: "ROUTER_NOT_ACTIVE",
      inputs: [],
    },
    {
      type: "error",
      name: "TOKEN_ALLOWANCE",
      inputs: [],
    },
    {
      type: "error",
      name: "WITHDRAW_FAILED",
      inputs: [],
    },
    {
      type: "error",
      name: "YIELD_TRANSFER_FAILED",
      inputs: [],
    },
  ],
};

export { ROUTER_CONTRACT };
