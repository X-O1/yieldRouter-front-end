const ROUTER_FACTORY_CONTROLLER_CONTRACT = {
  address: "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9",
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "_addressProvider",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "addFees",
      inputs: [
        {
          name: "_token",
          type: "address",
          internalType: "address",
        },
        {
          name: "_amount",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "addRouter",
      inputs: [
        {
          name: "_address",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "createRouterFactory",
      inputs: [
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
          name: "_startingRouterFeePercentage",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      outputs: [
        {
          name: "",
          type: "address",
          internalType: "contract RouterFactory",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "getCollectedFees",
      inputs: [
        {
          name: "_token",
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
      name: "getFactories",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "tuple[]",
          internalType: "struct RouterFactoryController.FactoryDetails[]",
          components: [
            {
              name: "factoryAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "yieldBarringTokenAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "principalTokenAddress",
              type: "address",
              internalType: "address",
            },
          ],
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
          name: "",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "s_feesCollected",
      inputs: [
        {
          name: "token",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "amount",
          type: "uint256",
          internalType: "uint256",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "triggerYieldRouting",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "withdrawFees",
      inputs: [
        {
          name: "_token",
          type: "address",
          internalType: "address",
        },
        {
          name: "_amount",
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
      name: "Router_Factory_Created",
      inputs: [
        {
          name: "factory",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "yieldToken",
          type: "address",
          indexed: false,
          internalType: "address",
        },
        {
          name: "principalToken",
          type: "address",
          indexed: false,
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
      name: "FailedDeployment",
      inputs: [],
    },
    {
      type: "error",
      name: "INSUFFICIENT_BALANCE",
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
      name: "NOT_FACTORY",
      inputs: [],
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
      name: "NO_FACTORIES",
      inputs: [],
    },
    {
      type: "error",
      name: "WITHDRAW_FAILED",
      inputs: [],
    },
  ],
};

export { ROUTER_FACTORY_CONTROLLER_CONTRACT };
