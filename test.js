const Network = require("@maticnetwork/meta/network");
const Matic = require("@maticnetwork/maticjs").default;
const config = require("./config");

const network = new Network(config.network, config.version);
const MaticNetwork = network.Matic;
const MainNetwork = network.Main;

const Ropsten_Erc20Address = config.Ropsten_Erc20Address;
const Matic_Erc20Address = config.Matic_Erc20Address;

const from = config.from; // from address

const matic = new Matic({
  maticProvider: MaticNetwork.RPC,
  parentProvider: MainNetwork.RPC,
  rootChain: MainNetwork.Contracts.RootChain,
  posRootChainManager: config.POS_ROOT_CHAIN_MANAGER_ADDRESS,
});

async function init() {
  await matic.initialize();
  await matic.setWallet(config.privateKey);
}

async function approve() {
  init();
  const amount = "100000000000000000";
  const tx = await matic
    .approvePOSERC20ForDeposit(Ropsten_Erc20Address, amount, { from })
    .then(async (logs) => {
      console.log("Approve" + logs.transactionHash);
    });
}

async function executeRaw() {
  // eslint-disable-line
  await matic.initialize();
  const txParams = await matic.approvePOSERC20ForDeposit(rootToken, amount, {
    from,
    encodeAbi: true,
  });
  let serializedTx = utils.buildRawTransaction(txParams, config.PRIVATE_KEY);
  return matic.web3Client.parentWeb3.eth.sendSignedTransaction(serializedTx);
}

approve();
