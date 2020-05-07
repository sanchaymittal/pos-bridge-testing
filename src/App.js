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
} from "./web3Service";

function App() {
  window.addEventListener("load", async function () {
    const address = await getDefaultAccount();
    setAccount(address);
  });
  const [txHash, setTxHash] = React.useState("");
  const [account, setAccount] = React.useState("");

  const address = async () => {
    const address = await getDefaultAccount();
    setAccount(address);
  };

  const txhash = async (pValue) => {
    setTxHash(pValue);
    console.log(txHash);
  };
  return (
    <div className="App">
      {/* <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <div>
        <h3> PoS bridge Testing </h3>
        <React.Fragment>
          {""}
          <div>
            <h3 onChange={() => address()}>Current Address: {account}</h3>
            <button onClick={() => approve()} size="small">
              Approve(On Ropsten)
            </button>
            <button onClick={() => deposit()} size="small">
              deposit(On Ropsten)
            </button>
            <button onClick={() => burn()} size="small">
            Burn(On Matic)
            </button>
            <input
              type="string"
              name="hash"
              id="hash"
              placeholder="0x"
              value={txHash}
              onChange={(e) => txhash(e.target.value)}
            />
            <button onClick={() => exit(txHash)} size="small">
              Exit(On Ropsten)
            </button>
            <p>or</p>
            <button onClick={() => rootToMatic()} size="small">
              Deposit from RootChain to MaticChain(On Ropsten)
            </button>
            {""}
            <button onClick={() => burn()} size="small">
              Burn(On Matic)
            </button>
            <input
              type="string"
              name="hash"
              id="hash"
              placeholder="0x"
              value={txHash}
              onChange={(e) => txhash(e.target.value)}
            />
            <button onClick={() => exit(txHash)} size="small">
              Exit(On Ropsten)
            </button>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
}

export default App;
