export const abi = [
  {
    type: "function",
    name: "donate",
    inputs: [],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "donations",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getProjects",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct IImpactManager.Project[]",
        components: [
          { name: "id", type: "uint256", internalType: "uint256" },
          { name: "name", type: "string", internalType: "string" },
          {
            name: "description",
            type: "string",
            internalType: "string",
          },
          {
            name: "lifetime",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "starttime",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "target", type: "uint256", internalType: "uint256" },
          {
            name: "collected",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "reputation",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "owner",
            type: "address",
            internalType: "address payable",
          },
          { name: "approved", type: "bool", internalType: "bool" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "milestonesByProjectId",
    inputs: [
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "description", type: "string", internalType: "string" },
      { name: "weight", type: "uint256", internalType: "uint256" },
      { name: "completed", type: "bool", internalType: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "projectById",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "id", type: "uint256", internalType: "uint256" },
      { name: "name", type: "string", internalType: "string" },
      { name: "description", type: "string", internalType: "string" },
      { name: "lifetime", type: "uint256", internalType: "uint256" },
      { name: "starttime", type: "uint256", internalType: "uint256" },
      { name: "target", type: "uint256", internalType: "uint256" },
      { name: "collected", type: "uint256", internalType: "uint256" },
      { name: "reputation", type: "uint256", internalType: "uint256" },
      {
        name: "owner",
        type: "address",
        internalType: "address payable",
      },
      { name: "approved", type: "bool", internalType: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "propose",
    inputs: [
      {
        name: "createProjectDto",
        type: "tuple",
        internalType: "struct IImpactManager.CreateProjectDto",
        components: [
          { name: "name", type: "string", internalType: "string" },
          {
            name: "description",
            type: "string",
            internalType: "string",
          },
          {
            name: "lifetime",
            type: "uint256",
            internalType: "uint256",
          },
          { name: "target", type: "uint256", internalType: "uint256" },
          { name: "owner", type: "address", internalType: "address" },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Donated",
    inputs: [
      {
        name: "donor",
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
];
