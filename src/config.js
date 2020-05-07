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
  ROOTWETH_ADDRESS: "0x7BdDd37621186f1382FD59e1cCAE0316F979a866", // This is a wrapped ETH ERC20 contract address so that we can support ETH deposits to the sidechain
  CHILDCHAIN_ADDRESS: "0xa2EF03edfA084ac9e5Bf110e409Ed5483BAe4101", // This is child chain contract address
  MATICWETH_ADDRESS: "0x8567184E6F9b1B77f24AfF6168453419AD22f90e", // The corresponding wrapped ETH ERC20 contract address on the Matic chain
  MATIC_TEST_TOKEN: "0xa1035dca1e0948029a7Ddd357c2F22d829Ba00d5", // Contract for ERC20 in Matic testnet
  // ROPSTEN_ERC721_TOKEN: "0x07d799252cf13c01f602779b4dce24f4e5b08bbd", // Contract for ERC721 in Ropsten testnet
  // MATIC_ERC721_TOKEN: "0x8D5231e0B79edD9331e0CF0d4B9f3F30d05C47A5", // Contract for ERC721 in matic testnet
  POS_ROOT_CHAIN_MANAGER_ADDRESS: "0x2533Ff3dC3E2389EE5304dC8686d66D08758BA99", // Address of RootChainManager for POS Portal
  ROPSTEN_POS_TEST_TOKEN: "0x884f49c6a175fF34b9B1194eb4cd36C05510e3b9", // Contract for ERC20 in Ropsten
  MATIC_POS_TEST_TOKEN: "0xa1035dca1e0948029a7Ddd357c2F22d829Ba00d5", // Contract for POS ERC20 on matic testnet

  ROPSTEN_POS_NA_TEST_TOKEN: "0x86632c0889AE0f7bc9005230Db6bE2527Da046EA",
  MATIC_POS_NA_TEST_TOKEN: "0xbB6c5C74b1499BB3d88c5CFbC5Ddc49fFc40C928"
};
