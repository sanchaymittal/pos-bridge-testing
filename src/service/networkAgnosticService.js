import Biconomy from "@biconomy/mexa";
import {
  CHILD_ETH_TOKEN_ADDRESS,
  CHILD_ETH_TOKEN_ABI,
  CHILD_TOKEN_ABI,
  CHILD_DUMMY_TOKEN_ADDRESS,
} from "../constants";
import { getDefaultAccount } from "./web3Service";
const Web3 = require("web3");

let sigUtil = require("eth-sig-util");

const biconomyAPIKey = "yhgD9_k2A.a88e1bb4-056c-4bb0-ac52-5d917ce8c7bc"; // add your api  key from the dashboard

const parentChainId = "3"; // chain id of the network tx is signed on
const maticProvider = "https://testnetv3.matic.network";

const domainType = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];

const metaTransactionType = [
  { name: "nonce", type: "uint256" },
  { name: "from", type: "address" },
  { name: "functionSignature", type: "bytes" },
];

window.ethereum.enable().catch((error) => {
  console.log(error);
});
const web3 = new Web3(window.ethereum);
const biconomy = new Biconomy(new Web3.providers.HttpProvider(maticProvider), {
  apiKey: biconomyAPIKey,
  debug: true,
});
const getWeb3 = new Web3(biconomy);

biconomy
  .onEvent(biconomy.READY, () => {
    // Initialize your dapp here like getting user accounts etc
    console.log("Mexa is Ready");
  })
  .onEvent(biconomy.ERROR, (error, message) => {
    // Handle error while initializing mexa
    console.error(error);
  });

export const getContractDetails = async (pAddress) => {
  let abi;
  if (pAddress === CHILD_ETH_TOKEN_ADDRESS) abi = CHILD_ETH_TOKEN_ABI;
  else abi = CHILD_TOKEN_ABI;
  const contract = new getWeb3.eth.Contract(abi, pAddress);
  const tokenName = await contract.methods.name().call();
  console.log(tokenName);
  let domainData = {
    name: tokenName,
    version: "1",
    chainId: parentChainId,
    verifyingContract: pAddress,
  };
  return { contract, domainData };
};
export const networkAgnosticBurn = async (pAmount, address) => {
  const detail = await getContractDetails(address);
  const amount = web3.utils.toWei(pAmount + "");
  let functionSignature = detail.contract.methods.withdraw(amount).encodeABI();
  console.log(functionSignature);
  executeMetaTransaction(functionSignature, detail.contract, detail.domainData);
};

export const transfer = async (pAmount, pRecipient, tokenAddress) => {
  const detail = await getContractDetails(tokenAddress);
  const amount = web3.utils.toWei(pAmount + "");
  let functionSignature = detail.contract.methods
    .transfer(pRecipient, amount)
    .encodeABI();
  console.log(functionSignature);
  executeMetaTransaction(functionSignature, detail.contract, detail.domainData);
};

export const approve = async (pAmount, spender, tokenAddress) => {
  const detail = await getContractDetails(tokenAddress);
  const amount = web3.utils.toWei(pAmount + "");
  let userAddress = await getDefaultAccount();
  let functionSignature = detail.contract.methods
    .approve(spender, amount)
    .encodeABI();
  console.log(functionSignature);
  executeMetaTransaction(functionSignature, detail.contract, detail.domainData);
};

const executeMetaTransaction = async (
  functionSignature,
  contract,
  domainData
) => {
  let userAddress = await getDefaultAccount();
  let nonce = await contract.methods.getNonce(userAddress).call();

  let message = {};
  message.nonce = parseInt(nonce);
  message.from = userAddress;
  message.functionSignature = functionSignature;
  message.network = "Interact with Matic Network";

  const dataToSign = JSON.stringify({
    types: {
      EIP712Domain: domainType,
      MetaTransaction: metaTransactionType,
    },
    domain: domainData,
    primaryType: "MetaTransaction",
    message: message,
  });
  console.log(domainData);
  console.log(userAddress);
  web3.eth.currentProvider.send(
    {
      jsonrpc: "2.0",
      id: 999999999999,
      method: "eth_signTypedData_v4",
      params: [userAddress, dataToSign],
    },
    async function (error, response) {
      console.info(`User signature is ${response.result}`);

      let { r, s, v } = getSignatureParameters(response.result);

      // logging output
      console.log(userAddress);
      console.log(JSON.stringify(message));
      console.log(message);
      console.log(getSignatureParameters(response.result));

      const recovered = sigUtil.recoverTypedSignature_v4({
        data: JSON.parse(dataToSign),
        sig: response.result,
      });
      console.log(`Recovered ${recovered}`);
      let tx = await contract.methods
        .executeMetaTransaction(userAddress, functionSignature, r, s, v)
        .send({
          from: userAddress,
        });
      console.log(tx, await contract.methods.balanceOf(userAddress).call());
    }
  );
};

const getSignatureParameters = (signature) => {
  if (!web3.utils.isHexStrict(signature)) {
    throw new Error(
      'Given value "'.concat(signature, '" is not a valid hex string.')
    );
  }
  var r = signature.slice(0, 66);
  var s = "0x".concat(signature.slice(66, 130));
  var v = "0x".concat(signature.slice(130, 132));
  v = web3.utils.hexToNumber(v);
  if (![27, 28].includes(v)) v += 27;
  return {
    r: r,
    s: s,
    v: v,
  };
};
