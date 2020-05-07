const Matic = require("@maticnetwork/maticjs");
const config = require("./config");
const Web3 = require("web3");
window.ethereum.enable().catch((error) => {
  console.log(error);
});

const web3 = new Web3(window.ethereum);

const matic = new Matic({
  maticProvider: window.ethereum,
  parentProvider: window.ethereum,
  rootChain: config.ROOTCHAIN_ADDRESS,
  posRootChainManager: config.POS_ROOT_CHAIN_MANAGER_ADDRESS,
});

const rootToken = config.ROPSTEN_POS_TEST_TOKEN;
const childToken = config.MATIC_POS_TEST_TOKEN;

const rootNAToken = config.ROPSTEN_POS_NA_TEST_TOKEN;
const childNAToken = config.MATIC_POS_NA_TEST_TOKEN;

const amount = "100000000000000000";

export async function getDefaultAccount() {
  try {
    const accounts = await getAccounts();
    if (accounts && accounts.length >= 1) {
      return accounts[0];
    }
  } catch (e) {
    // ignore
  }
  return null;
}
// get accounts
export function getAccounts() {
  return window.ethereum.enable().then(() => {
    const web3 = new Web3(window.ethereum);
    return new Promise((resolve, reject) => {
      web3.eth.getAccounts((err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  });
}

export const rootToMatic = async () => {
  await approve();
  await deposit();
};

// export const maticToRoot = async () =>{
//   const hash = await burn();
//   console.log("Now waiting for 6 mins for the checkpoint");
//   await PromiseTimeout(360000);
//   await exit(hash);
// }
async function PromiseTimeout(delayms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, delayms);
  });
}

export const approve = async () => {
  const from = await getDefaultAccount();
  await matic
    .approvePOSERC20ForDeposit(rootToken, amount, { from })
    .then(async (logs) => {
      console.log("Approve: " + logs.transactionHash);
    });
};
export const deposit = async () => {
  const from = await getDefaultAccount();
  await matic
    .depositPOSERC20ForUser(rootToken, from, amount, {
      from,
      gasPrice: "80000000000",
    })
    .then(async (logs) => {
      console.log("Deposit: " + logs.transactionHash);
    });
};

export const burn = async () => {
  const from = await getDefaultAccount();
  let tx;
  await matic.burnPOSERC20(childToken, amount, { from }).then(async (logs) => {
    console.log("Burn: " + logs.transactionHash);
    tx = logs.transactionHash;
  });
  return tx;
};

export const exit = async (burnTxHash) => {
  const from = await getDefaultAccount();
  await matic.exitPOSERC20(burnTxHash, { from }).then(async (logs) => {
    console.log("Exit: " + logs.transactionHash);
  });
};
