module.exports = {
  MATIC_PROVIDER: "https://testnetv3.matic.network", // This is the MATIC testnet RPC
  PARENT_PROVIDER:
    "https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc", // This is the Ropsten testnet RPC
  REGISTRY_ADDRESS: "0x56B082d0a590A7ce5d170402D6f7f88B58F71988",
  ROOTCHAIN_ADDRESS: "0x82a72315E16cE224f28E1F1fB97856d3bF83f010", // The address for the main Plasma contract in  Ropsten testnet
  WITHDRAWMANAGER_ADDRESS: "0x3cf9aD3395028a42EAfc949e2EC4588396b8A7D4", // An address for the WithdrawManager contract on Ropsten testnet
  DEPOSITMANAGER_ADDRESS: "0x3Bc6701cA1C32BBaC8D1ffA2294EE3444Ad93989", // An address for a DepositManager contract in Ropsten testnet
  SYNCER_URL: "https://testnetv3-syncer.api.matic.network/api/v1", // Backend service which syncs the Matic sidechain state to a MySQL database which we use for faster querying. This comes in handy especially for constructing withdrawal proofs while exiting assets from Plasma.
  WATCHER_URL: "https://testnetv3-watcher.api.matic.network/api/v1", // Backend service which syncs the Matic Plasma contract events on Ethereum mainchain to a MySQL database which we use for faster querying. This comes in handy especially for listening to asset deposits on the Plasma contract.
};
