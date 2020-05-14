import React from "react";
import "./App.css";
import {
  Button,
  Navbar,
  Badge,
  FormControl,
  Jumbotron,
  OverlayTrigger,
  Tooltip,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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
  checkMapToken,
  getNetwork,
} from "./service/web3Service";
import {
  ROOT_PROVIDER,
  CHILD_PROVIDER,
  ROOT_DUMMY_TOKEN_ADDRESS,
  CHILD_DUMMY_TOKEN_ADDRESS,
  ROOT_ETH_TOKEN_ADDRESS,
  CHILD_ETH_TOKEN_ADDRESS,
  TOKEN_LIST,
} from "./constants";

function App() {
  window.addEventListener("load", async function () {
    const address = await getDefaultAccount();
    const network = await getNetwork();
    setNetworkType(network);
    setAccount(address);
    updateDummyTokenMaticBalance();
    updateEthRopstenBalance();
    updateEthMaticBalance();
    updateDummyTokenRopstenBalance();
  });
  const [txHash, setTxHash] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [rootToken, setRootToken] = React.useState("");
  const [childToken, setChildToken] = React.useState("");
  const [networkType, setNetworkType] = React.useState("");
  const [token, setToken] = React.useState("");
  const [
    dummyTokenRopstenBalance,
    setDummyTokenRopstenBalance,
  ] = React.useState("");
  const [dummyTokenMaticBalance, setDummyTokenMaticBalance] = React.useState(
    ""
  );
  const [ethRopstenBalance, setEthRopstenBalance] = React.useState("");
  const [ethMaticBalance, setEthMaticBalance] = React.useState("");
  const [tokenAddress, setTokenAddress] = React.useState("");
  // const [
  //   NADummyTokenRopstenBalance,
  //   setNADummyTokenRopstenBalance,
  // ] = React.useState("");
  // const [NADummyTokenMaticBalance, setNADummyTokenMaticBalance] = React.useState(
  //   ""
  // );
  const [amount, setAmount] = React.useState(0);
  const [burnAmount, setBurnAmount] = React.useState(0);

  const updateDummyTokenRopstenBalance = async () => {
    const dummyRopstenBalance = await getUserTokenBalance(
      ROOT_DUMMY_TOKEN_ADDRESS,
      ROOT_PROVIDER
    );
    await setDummyTokenRopstenBalance(dummyRopstenBalance);
  };
  const updateEthRopstenBalance = async () => {
    const RopstenBalance = await getEthBalance(ROOT_PROVIDER);
    await setEthRopstenBalance(RopstenBalance);
  };

  const updateEthMaticBalance = async () => {
    const MaticBalance = await await getUserTokenBalance(
      CHILD_ETH_TOKEN_ADDRESS,
      CHILD_PROVIDER
    );
    await setEthMaticBalance(MaticBalance);
  };

  const updateDummyTokenMaticBalance = async () => {
    const dummyMaticBalance = await getUserTokenBalance(
      CHILD_DUMMY_TOKEN_ADDRESS,
      CHILD_PROVIDER
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
  };

  const refreshMaticBalance = async () => {
    await updateEthMaticBalance();
    await updateDummyTokenMaticBalance();
  };

  const refreshRopstenBalance = async () => {
    await updateEthRopstenBalance();
    await updateDummyTokenRopstenBalance();
  };

  const txhash = async (pHash) => {
    setTxHash(pHash);
    console.log(txHash);
  };
  return (
    <div className="App">
      <Navbar sticky="top" bg="primary" variant="dark">
        <Navbar.Brand href="#home">Matic Testing Portal</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="navbar-text">
            Network: {networkType} | Current Address: {account}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <React.Fragment>
        <Container fluid="md">
          <Jumbotron className="p-jumbotron">
            <h2>Test PoS Portal and Network Agnostic Features of Matic</h2>
          </Jumbotron>
          <div className="row">
            <div className="col-md-6">
              <div className="row-md-6">
                <div className="card">
                  <h3>PoS Portal Testing</h3>

                  <div className="row p-8">
                    <div className="col-md-3 p-0">
                      <FormControl
                        placeholder="Select Token"
                        aria-label="Select Token"
                        aria-describedby="token"
                        as="select"
                        size="small"
                        custom
                      >
                        <>
                          {TOKEN_LIST.map((placement) => (
                            <option
                              value={placement.rootTokenAddress}
                              onChange={(e) => setTokenAddress(e.target.value)}
                            >
                              {placement.tokenSymbol}
                            </option>
                          ))}
                        </>
                      </FormControl>
                    </div>
                    <div className="col-md-3 p-0">
                      <FormControl
                        type="string"
                        name="amount"
                        id="amount"
                        placeholder="Amount"
                        value={amount || ""}
                        onChange={(e) => setAmount(e.target.value)}
                      ></FormControl>
                    </div>
                    <div className="col-md-4 p-0 ">
                      <OverlayTrigger
                        key="bottom"
                        placement="bottom"
                        overlay={
                          <Tooltip id="tooltip-bottom">
                            Ropsten -> Matic : Lock your tokens in Plasma
                            secured contract and mint on Matic
                          </Tooltip>
                        }
                      >
                        <Button
                          className="button-size m-left-8"
                          variant="outline-success"
                          onClick={() =>
                            tokenAddress === ROOT_ETH_TOKEN_ADDRESS
                              ? depositEtherFor(amount)
                              : deposit(tokenAddress, amount)
                          }
                          size="small"
                        >
                          Deposit
                        </Button>
                      </OverlayTrigger>{" "}
                    </div>
                    <div className="col-md-2 p-0 ">
                      <Badge
                        className="button-size m-left-negative-10"
                        pill
                        variant="info"
                      >
                        Ropsten
                      </Badge>{" "}
                    </div>
                  </div>

                  <div className="row p-8">
                    <div className="col-md-3 p-0">
                      <FormControl
                        placeholder="Select Token"
                        aria-label="Select Token"
                        aria-describedby="token"
                        as="select"
                        size="small"
                        custom
                      >
                        <>
                          {TOKEN_LIST.map((placement) => (
                            <option
                              value={placement.rootTokenAddress}
                              onChange={(e) => setTokenAddress(e.target.value)}
                            >
                              {placement.tokenSymbol}
                            </option>
                          ))}
                        </>
                      </FormControl>
                    </div>
                    <div className="col-md-3 p-0">
                      <FormControl
                        type="string"
                        name="Burn Amount"
                        id="burnAmount"
                        placeholder="Burn Amount"
                        value={burnAmount || ""}
                        onChange={(e) => setBurnAmount(e.target.value)}
                      ></FormControl>
                    </div>
                    <div className="col-md-4 p-0 ">
                      <OverlayTrigger
                        key="bottom"
                        placement="bottom"
                        overlay={
                          <Tooltip id="tooltip-bottom">
                            Burn your token on Matic Chain to get unlock hash
                            for Ropsten
                          </Tooltip>
                        }
                      >
                        <Button
                          className="button-size m-left-8"
                          variant="outline-primary"
                          onClick={() => burn(tokenAddress, burnAmount)}
                          size="small"
                        >
                          Burn
                        </Button>
                      </OverlayTrigger>{" "}
                    </div>
                    <div className="col-md-2 p-0 ">
                      <Badge
                        className="button-size m-left-negative-10"
                        pill
                        variant="info"
                      >
                        Matic
                      </Badge>{" "}
                    </div>
                  </div>

                  <div className="row p-8">
                    <div className="col-md-6 p-0">
                      <FormControl
                        type="string"
                        name="hash"
                        id="hash"
                        placeholder="Tx hash from Burn()"
                        value={txHash}
                        onChange={(e) => txhash(e.target.value)}
                      ></FormControl>
                    </div>
                    <div className="col-md-4 p-0 ">
                      <OverlayTrigger
                        key="bottom"
                        placement="bottom"
                        overlay={
                          <Tooltip id="tooltip-bottom">
                            burn token hash to unlock the asset and receive it
                            in your account.
                          </Tooltip>
                        }
                      >
                        <Button
                          className="button-size m-left-8"
                          variant="outline-success"
                          onClick={() => exit(txHash)}
                          size="small"
                        >
                          Exit
                        </Button>
                      </OverlayTrigger>{" "}
                    </div>
                    <div className="col-md-2 p-0 ">
                      <Badge
                        className="button-size m-left-negative-10"
                        pill
                        variant="info"
                      >
                        Ropsten
                      </Badge>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row-md-6">
                <div className="card">
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
                  <p> map from Root to Matic | map from Matic to Root</p>
                  <button
                    onClick={() => mapTokenRootChain(rootToken, childToken)}
                  >
                    Map Token(on Ropsten)
                  </button>
                  <button
                    onClick={() => mapTokenChildChain(rootToken, childToken)}
                  >
                    Map Token(on Matic)
                  </button>
                  <p>Check for Successful Mapping</p>
                  <button onClick={() => checkMapToken(rootToken, childToken)}>
                    Check Mapping
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row-md-3">
                <div className="card">
                  <span className="row">
                    <Badge className="col-md-3 balance" variant="success">
                      Ropsten Balance
                    </Badge>{" "}
                    <Badge className="col-md-3 balance">
                      {Number.parseFloat(ethRopstenBalance).toFixed(3)} ETH{" "}
                    </Badge>
                    <Badge className="col-md-3 balance">
                      {Number.parseFloat(dummyTokenRopstenBalance).toFixed(3)}{" "}
                      DUMMY{" "}
                    </Badge>
                    <Button
                      className="col-md-3 balance"
                      variant="secondary"
                      onClick={() => refreshRopstenBalance()}
                    >
                      Refresh
                    </Button>
                  </span>
                  <span className="row">
                    <Badge className="col-md-3 balance" variant="primary">
                      Matic Balance
                    </Badge>{" "}
                    <Badge className="col-md-3 balance">
                      {Number.parseFloat(ethMaticBalance).toFixed(3)} ETH{" "}
                    </Badge>
                    <Badge className="col-md-3 balance">
                      {Number.parseFloat(dummyTokenMaticBalance).toFixed(3)}{" "}
                      DUMMY{" "}
                    </Badge>
                    <Button
                      className="col-md-3 balance"
                      variant="secondary"
                      onClick={() => refreshMaticBalance()}
                    >
                      Refresh
                    </Button>
                  </span>
                </div>
              </div>
              <div className="row-md-3">
                <div className="card">
                  <h3>Mint Dummy Tokens for Testing</h3>
                  <button onClick={() => mint()} size="small">
                    Mint Dummy Tokens
                  </button>
                </div>
              </div>
              <div className="row-md-6">
                Transaction History(Coming Soon!!!)
              </div>
            </div>
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default App;
