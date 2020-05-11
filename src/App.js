import React from "react";
import "./App.css";
import {
  getDefaultAccount,
  approve,
  deposit,
  burn,
  exit,
  rootToMatic,
  maticToRoot,
  mapTokenRootChain,
  mapTokenChildChain,
  getUserTokenBalance,
  mint,
} from "./web3Service";
import {
  ROOT_DUMMY_TOKEN_ADDRESS,
  CHILD_DUMMY_TOKEN_ADDRESS,
} from "./constants";

function App() {
  window.addEventListener("load", async function () {
    const address = await getDefaultAccount();
    const dummyRopstenBalance = await getUserTokenBalance(
      ROOT_DUMMY_TOKEN_ADDRESS,
      config.PARENT_PROVIDER
    );
    setAccount(address);
    updateDummyTokenMaticBalance();
    setDummyTokenRopstenBalance(dummyRopstenBalance);
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
  const [amount, setAmount] = React.useState(0);

  const updateDummyTokenMaticBalance = async () => {
    const dummyMaticBalance = await getUserTokenBalance(
      CHILD_DUMMY_TOKEN_ADDRESS,
      config.MATIC_PROVIDER
    );
    setDummyTokenMaticBalance(dummyMaticBalance);
  };

  const deposit = (ROOT_DUMMY_TOKEN_ADDRESS, amount) => {
    rootToMatic(ROOT_DUMMY_TOKEN_ADDRESS, amount);
    updateDummyTokenMaticBalance();
  };

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
            <h4>
              User Dummy Token Balance on Ropsten: {dummyTokenRopstenBalance}{" "}
              DUMMY
            </h4>
            <h4>
              User Dummy Token Balance on Matic: {dummyTokenMaticBalance} DUMMY
            </h4>
            <input
              type="string"
              name="amount"
              id="amount"
              placeholder="Amount"
              value={amount || ""}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={() => mint()} size="small">
              Mint Dummy Tokens
            </button>
            <button
              onClick={() => deposit(ROOT_DUMMY_TOKEN_ADDRESS, amount)}
              size="small"
            >
              Deposit from RootChain to MaticChain(On Ropsten)
            </button>
            {/* <button
              onClick={() => approve(ROOT_DUMMY_TOKEN_ADDRESS, amount)}
              size="small"
            >
              Approve(On Ropsten)
            </button>
            <button
              onClick={() => deposit(ROOT_DUMMY_TOKEN_ADDRESS, amount)}
              size="small"
            >
              deposit(On Ropsten)
            </button> */}
            <button onClick={() => burn()} size="small">
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
            <button onClick={() => mapTokenChildChain(childToken, childToken)}>
              Map Token(on Matic)
            </button>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
}

export default App;
