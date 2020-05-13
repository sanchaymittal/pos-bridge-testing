import React from "react";
import "./App.css";
import {
  getDefaultAccount,
  burn,
  exit,
  rootToMatic,
  depositEth,
  mapTokenRootChain,
  mapTokenChildChain,
  getUserTokenBalance,
  getEthBalance,
  mint,
  checkMapToken
} from "./service/web3Service";
import {
  ROOT_DUMMY_TOKEN_ADDRESS,
  CHILD_DUMMY_TOKEN_ADDRESS,
  CHILD_ETH_TOKEN_ADDRESS
} from "./constants";

function App() {
  window.addEventListener("load", async function () {
    const address = await getDefaultAccount();

    // const NADummyTokenRopstenBalance = await getUserTokenBalance()
    await setAccount(address);
    await updateDummyTokenMaticBalance();
    await updateEthRopstenBalance();
    await updateEthMaticBalance();
    await updateDummyTokenRopstenBalance();
  });
  const config = require("./constants/config");
  const [txHash, setTxHash] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [rootToken, setRootToken] = React.useState("");
  const [childToken, setChildToken] = React.useState("");
  const [
    dummyTokenRopstenBalance,
    setDummyTokenRopstenBalance,
  ] = React.useState("");
  const [dummyTokenMaticBalance, setDummyTokenMaticBalance] = React.useState(
    ""
  );
  const [ethRopstenBalance, setEthRopstenBalance] = React.useState("");
  const [ethMaticBalance, setEthMaticBalance] = React.useState("");
  // const [
  //   NADummyTokenRopstenBalance,
  //   setNADummyTokenRopstenBalance,
  // ] = React.useState("");
  // const [NADummyTokenMaticBalance, setNADummyTokenMaticBalance] = React.useState(
  //   ""
  // );
  const [amount, setAmount] = React.useState(0);
  const [inputEth, setInputEth] = React.useState(0);

  const updateDummyTokenRopstenBalance = async () => {
    const dummyRopstenBalance = await getUserTokenBalance(
      ROOT_DUMMY_TOKEN_ADDRESS,
      config.PARENT_PROVIDER
    );
    await setDummyTokenRopstenBalance(dummyRopstenBalance);
  };
  const updateEthRopstenBalance = async () => {
    const RopstenBalance = await getEthBalance(config.PARENT_PROVIDER);
    await setEthRopstenBalance(RopstenBalance);
  };

  const updateEthMaticBalance = async () => {
    const MaticBalance = await await getUserTokenBalance(
      CHILD_ETH_TOKEN_ADDRESS,
      config.MATIC_PROVIDER
    );
    await setEthMaticBalance(MaticBalance);
  };

  const updateDummyTokenMaticBalance = async () => {
    const dummyMaticBalance = await getUserTokenBalance(
      CHILD_DUMMY_TOKEN_ADDRESS,
      config.MATIC_PROVIDER
    );
    await setDummyTokenMaticBalance(dummyMaticBalance);
  };

  const deposit = async (ROOT_DUMMY_TOKEN_ADDRESS, amount) => {
    await rootToMatic(ROOT_DUMMY_TOKEN_ADDRESS, amount);
    await updateDummyTokenMaticBalance();
  };

  const depositEtherFor = async (pAmount) => {
    await depositEth(pAmount);
    await updateEthMaticBalance();
  }

  const refreshMaticBalance = async ()=>{
    await updateEthMaticBalance();
    await updateDummyTokenMaticBalance();
  }

  const refreshRopstenBalance = async ()=>{
    await updateEthRopstenBalance();
    await updateDummyTokenRopstenBalance();
  }

  const txhash = async (pHash) => {
    setTxHash(pHash);
    console.log(txHash);
  };
  return (
    <div className="App">
      {/* <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <div>
        <h1> PoS Portal Testing </h1>
        <React.Fragment>
          {""}
          <div>
            <h3>Current Address: {account}</h3>
            <span>
              Ropsten Balance:{" "}
              <label>
                {Number.parseFloat(ethRopstenBalance).toFixed(3)} ETH |{" "}
                {Number.parseFloat(dummyTokenRopstenBalance).toFixed(3)} DUMMY
              </label>{" "}
              <button onClick={() => refreshRopstenBalance()}>Refresh</button>
            </span>
            <div> </div>
            <span>
              Matic Balance:{" "}
              <label>
                {Number.parseFloat(ethMaticBalance).toFixed(3)} ETH |{" "}
                {Number.parseFloat(dummyTokenMaticBalance).toFixed(3)} DUMMY
              </label>{" "}
              <button onClick={() => refreshMaticBalance()}>Refresh</button>
            </span>
          </div>
          <div>
            <h3>Mint Dummy Tokens for Testing</h3>
            <button onClick={() => mint()} size="small">
              Mint Dummy Tokens
            </button>
          </div>
          <div>
          <h3>Test Deposit and withdrawal ERC20 Tokens on PoS Bridge.</h3>
          <input
              type="string"
              name="amount"
              id="amount"
              placeholder="Amount"
              value={amount || ""}
              onChange={(e) => setAmount(e.target.value)}
          />
            <button
              onClick={() => deposit(ROOT_DUMMY_TOKEN_ADDRESS, amount)}
              size="small"
            >
              Deposit from RootChain to MaticChain(On Ropsten)
            </button>
            <button onClick={() => burn(CHILD_DUMMY_TOKEN_ADDRESS, amount)} size="small">
              Burn(On Matic)
            </button>
            <input
              type="string"
              name="hash"
              id="hash"
              placeholder="Tx hash from Burn()"
              value={txHash}
              onChange={(e) => txhash(e.target.value)}
            />
            <button onClick={() => exit(txHash)} size="small">
              Exit(On Ropsten)
            </button>
          </div>
          <div>
          <h3>Test Deposit and withdrawal Ether using PoS Bridge.</h3>
          <input
              type="string"
              name="eth"
              id="eth"
              placeholder="Input ETH"
              value={inputEth || ""}
              onChange={(e) => setInputEth(e.target.value)}
          />
            <button
              onClick={() => depositEtherFor(inputEth)}
              size="small"
            >
              Deposit ETH from RootChain to MaticChain(On Ropsten)
            </button>
            <button onClick={() => burn(CHILD_ETH_TOKEN_ADDRESS, inputEth)} size="small">
              Burn(On Matic)
            </button>
            <input
              type="string"
              name="hash"
              id="hash"
              placeholder="Tx hash from Burn()"
              value={txHash}
              onChange={(e) => txhash(e.target.value)}
            />
            <button onClick={() => exit(txHash)} size="small">
              Exit(On Ropsten)
            </button>
          </div>
          <div>
            <h2>Map Token</h2>
            <p>ps: Only permissioned address can map token</p>
            <input
              type="string"
              name="rootToken"
              id="rootToken"
              placeholder="Root Token Address"
              value={rootToken}
              onChange={(e) => setRootToken(e.target.value)}
            />
            <input
              type="string"
              name="childToken"
              id="childToken"
              placeholder="Child Token Address"
              value={childToken}
              onChange={(e) => setChildToken(e.target.value)}
            />
            <p> map from Root to Matic</p>
            <button onClick={() => mapTokenRootChain(rootToken, childToken)}>
              Map Token(on Ropsten)
            </button>
            <p> map from Matic to Root</p>
            <button onClick={() => mapTokenChildChain(rootToken, childToken)}>
              Map Token(on Matic)
            </button>
            <p>Check for Successful Mapping</p>
            <button onClick={() => checkMapToken(rootToken, childToken)}>
              Check Mapping
              </button>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
}

export default App;
