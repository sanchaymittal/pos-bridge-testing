import React from 'react';
import logo from './logo.svg';
import './App.css';

const Matic = require('@maticnetwork/maticjs').default
const config = require('./config')

const rootToken = config.ROPSTEN_TEST_TOKEN
const amount = "100000000000000000";
const from = config.FROM_ADDRESS

// Create Matic object
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChain: config.ROOTCHAIN_ADDRESS,
  posRootChainManager: config.POS_ROOT_CHAIN_MANAGER_ADDRESS,
})

// async function init() {
//   matic.setWallet(config.PRIVATE_KEY)
// }

async function approve() { // eslint-disable-line
  // init();
  const amount = "100000000000000000";
  const tx = await matic
    .approvePOSERC20ForDeposit(rootToken, amount, { from })
    .then(async (logs) => {
      console.log("Approve" + logs.transactionHash);
    });
}

function App() {
  
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      {/* </header> */}
      <div>
        <button onClick = {approve}>
          approve
        </button>
      </div>
    </div>
  );
}

export default App;
