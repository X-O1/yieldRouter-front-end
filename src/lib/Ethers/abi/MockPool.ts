const MOCK_POOL_CONTRACT = {
  address: "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0",
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "ausdcAddress",
          type: "address",
          internalType: "address",
        },
        {
          name: "usdcAddress",
          type: "address",
          internalType: "address",
        },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "getIndex",
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
      name: "getPool",
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
      name: "getReserveData",
      inputs: [
        {
          name: "asset",
          type: "address",
          internalType: "address",
        },
      ],
      outputs: [
        {
          name: "",
          type: "tuple",
          internalType: "struct MockPool.ReserveData",
          components: [
            {
              name: "configuration",
              type: "tuple",
              internalType: "struct MockPool.ReserveConfigurationMap",
              components: [
                {
                  name: "data",
                  type: "uint256",
                  internalType: "uint256",
                },
              ],
            },
            {
              name: "liquidityIndex",
              type: "uint128",
              internalType: "uint128",
            },
            {
              name: "currentLiquidityRate",
              type: "uint128",
              internalType: "uint128",
            },
            {
              name: "variableBorrowIndex",
              type: "uint128",
              internalType: "uint128",
            },
            {
              name: "currentVariableBorrowRate",
              type: "uint128",
              internalType: "uint128",
            },
            {
              name: "currentStableBorrowRate",
              type: "uint128",
              internalType: "uint128",
            },
            {
              name: "lastUpdateTimestamp",
              type: "uint40",
              internalType: "uint40",
            },
            {
              name: "id",
              type: "uint16",
              internalType: "uint16",
            },
            {
              name: "aTokenAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "stableDebtTokenAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "variableDebtTokenAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "interestRateStrategyAddress",
              type: "address",
              internalType: "address",
            },
            {
              name: "accruedToTreasury",
              type: "uint128",
              internalType: "uint128",
            },
            {
              name: "unbacked",
              type: "uint128",
              internalType: "uint128",
            },
            {
              name: "isolationModeTotalDebt",
              type: "uint128",
              internalType: "uint128",
            },
          ],
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "getReserveNormalizedIncome",
      inputs: [
        {
          name: "asset",
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
      name: "getUserBalance",
      inputs: [
        {
          name: "asset",
          type: "address",
          internalType: "address",
        },
        {
          name: "user",
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
      name: "liquidityIndex",
      inputs: [
        {
          name: "",
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
      name: "scaledBalances",
      inputs: [
        {
          name: "",
          type: "address",
          internalType: "address",
        },
        {
          name: "",
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
      name: "setLiquidityIndex",
      inputs: [
        {
          name: "newIndex",
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
      name: "withdraw",
      inputs: [
        {
          name: "asset",
          type: "address",
          internalType: "address",
        },
        {
          name: "amount",
          type: "uint256",
          internalType: "uint256",
        },
        {
          name: "to",
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
      stateMutability: "nonpayable",
    },
    {
      type: "error",
      name: "POOL_WITHDRAW_FAILED",
      inputs: [],
    },
  ],
};

export { MOCK_POOL_CONTRACT };
