const ROUTER_FACTORY_CONTRACT = {
  abi: [
    {
      type: "function",
      name: "activateActiveRouters",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "addToActiveRouterList",
      inputs: [
        {
          name: "_router",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "createRouter",
      inputs: [
        {
          name: "_owner",
          type: "address",
          internalType: "address",
        },
        {
          name: "_routerNickname",
          type: "string",
          internalType: "string",
        },
      ],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "contract Router",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "getAccountRouters",
      inputs: [
        {
          name: "_account",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "tuple[]",
          internalType: "struct RouterFactory.RouterDetails[]",
          components: [
            {
              name: "routerAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "tokenAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "routerNickname",
              type: "string",
              internalType: "string",
            },
          ],
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getActiveRouters",
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
      name: "getAllRouters",
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
      name: "getFactoryAddress",
      inputs: [],
      outputs: [
        {
          name: "factory",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getFactoryControllerAddress",
      inputs: [],
      outputs: [
        {
          name: "factory",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getFactoryControllerOwner",
      inputs: [],
      outputs: [
        {
          name: "factory",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getFactoryOwner",
      inputs: [],
      outputs: [
        {
          name: "owner",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getYieldBearingToken",
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
      name: "initialize",
      inputs: [
        {
          name: "_addressProvider",
          type: "address",
          internalType: "address",
        },
        {
          name: "_factoryController",
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
      name: "isRouterPermitted",
      inputs: [
        {
          name: "_router",
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
      name: "removeFromActiveRouterList",
      inputs: [
        {
          name: "_router",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "s_activeRouters",
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
      name: "s_allAccountRouters",
      inputs: [
        {
          name: "account",
          type: "address",
          internalType: "address",
        },
        {
          name: "",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "routerAddress",
          type: "address",
          internalType: "address",
        },
        {
          name: "tokenAddress",
          type: "address",
          internalType: "address",
        },
        {
          name: "routerNickname",
          type: "string",
          internalType: "string",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "s_routers",
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
      name: "setFactoryControllerOwner",
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
      type: "event",
      name: "Active_Routers_Activated",
      inputs: [
        {
          name: "numberOfRouters",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "Fees_Withdrawn",
      inputs: [
        {
          name: "recipient",
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
          indexed: false,
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
      name: "Router_Created",
      inputs: [
        {
          name: "routerAddress",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "yieldToken",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "routerNickname",
          type: "string",
          indexed: false,
          internalType: "string",
        },
        {
          name: "owner",
          type: "address",
          indexed: false,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "Router_Deactivated",
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
      name: "Router_Reverted",
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
      name: "Yield_Routed",
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
      name: "FailedDeployment",
      inputs: [],
    },
    {
      type: "error",
      name: "InsufficientBalance",
      inputs: [
        {
          name: "balance",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "needed",
          type: "uint256",
          internalType: "uint256",
        },
      ],
    },
    {
      type: "error",
      name: "NOT_OWNER",
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
      name: "ROUTER_NOT_FOUND",
      inputs: [],
    },
  ],
};

export { ROUTER_FACTORY_CONTRACT };
