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
  getUserTokenBalance,
  getEthBalance,
  getNetwork,
} from "./service/web3Service";
import {
  networkAgnosticBurn,
  transfer,
  approve,
  transferFrom,
} from "./service/networkAgnosticService";
import {
  ROOT_PROVIDER,
  CHILD_PROVIDER,
  ROOT_DUMMY_TOKEN_ADDRESS,
  CHILD_DUMMY_TOKEN_ADDRESS,
  ROOT_ETH_TOKEN_ADDRESS,
  CHILD_ETH_TOKEN_ADDRESS,
  TOKEN_LIST,
} from "./constants";
import UserStatus from "./components/UserStatus";

function App() {
  window.addEventListener("load", async function () {
    const address = await getDefaultAccount();
    const network = await getNetwork();
    setNetworkType(network);
    setAccount(address);
  });
  const [txHash, setTxHash] = React.useState("");
  const [account, setAccount] = React.useState("");
  const [networkType, setNetworkType] = React.useState("");
  const [dummyTokenMaticBalance, setDummyTokenMaticBalance] = React.useState(
    ""
  );
  const [ethMaticBalance, setEthMaticBalance] = React.useState("");
  const [rootTokenAddress, setRootTokenAddress] = React.useState(
    TOKEN_LIST[0].rootTokenAddress
  );
  const [childTokenAddress, setChildTokenAddress] = React.useState(
    TOKEN_LIST[0].childTokenAddress
  );
  const [amount, setAmount] = React.useState(0);
  const [maticAmount, setMaticAmount] = React.useState(0);
  const [address, setAddress] = React.useState("");

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

  const deposit = async (tokenAddress, amount) => {
    await rootToMatic(tokenAddress, amount);
    await updateDummyTokenMaticBalance();
  };

  const depositEtherFor = async (pAmount) => {
    await depositEth(pAmount);
    await updateEthMaticBalance();
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
            <h7>
              Hint: open the browser developer console to view any errors and
              warnings.
              <br />
              Interact with Matic Network from Parent Chain Only...
            </h7>
          </Jumbotron>
          <div className="row">
            <div className="col-md-6">
              <div className="row-md-6">
                <div className="card">
                  <h3>PoS Portal with support of NetworkAgnostic</h3>

                  <div className="row p-8">
                    <div className="col-md-3 p-0">
                      <FormControl
                        onChange={(e) => setRootTokenAddress(e.target.value)}
                        value={rootTokenAddress}
                        placeholder="Select Token"
                        aria-label="Select Token"
                        aria-describedby="token"
                        as="select"
                        size="small"
                        custom
                      >
                        <>
                          {TOKEN_LIST.map((placement) => (
                            <option value={placement.rootTokenAddress}>
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
                            Goerli -> Matic : Lock your tokens in POS Portal
                            contract and mint on Matic.
                          </Tooltip>
                        }
                      >
                        <Button
                          className="button-size m-left-8"
                          variant="outline-success"
                          onClick={() =>
                            rootTokenAddress === ROOT_ETH_TOKEN_ADDRESS
                              ? depositEtherFor(amount)
                              : deposit(rootTokenAddress, amount)
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
                        Goerli
                      </Badge>{" "}
                    </div>
                  </div>
                  <div>
                    <div className="row p-8">
                      <div className="col-md-3 p-0">
                        <FormControl
                          onChange={(e) => setChildTokenAddress(e.target.value)}
                          value={childTokenAddress}
                          placeholder="Select Token"
                          aria-label="Select Token"
                          aria-describedby="token"
                          as="select"
                          size="small"
                          custom
                        >
                          <>
                            {TOKEN_LIST.map((placement) => (
                              <option value={placement.childTokenAddress}>
                                {placement.tokenSymbol}
                              </option>
                            ))}
                          </>
                        </FormControl>
                      </div>

                      <div className="col-md-4 p-0">
                        <FormControl
                          type="string"
                          name="Address"
                          id="address"
                          placeholder="Address: '0x...'"
                          value={address || ""}
                          onChange={(e) => setAddress(e.target.value)}
                        ></FormControl>
                      </div>

                      <div className="col-md-3 p-0">
                        <FormControl
                          type="string"
                          name="Amount"
                          id="maticAmount"
                          placeholder="Amount"
                          value={maticAmount || ""}
                          onChange={(e) => setMaticAmount(e.target.value)}
                        ></FormControl>
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

                    <div className="row">
                      {/* onClick={() => burn(childTokenAddress, maticAmount)} */}
                      <div className="col-md-3 p-0 ">
                        <OverlayTrigger
                          key="bottom"
                          placement="bottom"
                          overlay={
                            <Tooltip id="tooltip-bottom">
                              Burn your tokens on Matic chain so they can be
                              exited from POS Portal on Main chain
                            </Tooltip>
                          }
                        >
                          <Button
                            className="button-size m-left-8"
                            variant="outline-primary"
                            onClick={() =>
                              networkAgnosticBurn(
                                maticAmount,
                                childTokenAddress
                              )
                            }
                            size="small"
                          >
                            Burn
                          </Button>
                        </OverlayTrigger>{" "}
                      </div>
                      <div className="col-md-3 p-0 ">
                        <OverlayTrigger
                          key="bottom"
                          placement="bottom"
                          overlay={
                            <Tooltip id="tooltip-bottom">
                              Transfer your tokens on Matic chain
                            </Tooltip>
                          }
                        >
                          <Button
                            className="button-size m-left-8"
                            variant="outline-primary"
                            onClick={() =>
                              transfer(maticAmount, address, childTokenAddress)
                            }
                            size="small"
                          >
                            Transfer
                          </Button>
                        </OverlayTrigger>{" "}
                      </div>
                      <div className="col-md-3 p-0 ">
                        <OverlayTrigger
                          key="bottom"
                          placement="bottom"
                          overlay={
                            <Tooltip id="tooltip-bottom">
                              Allow spender to spend your tokens on Matic chain
                            </Tooltip>
                          }
                        >
                          <Button
                            className="button-size m-left-8"
                            variant="outline-primary"
                            onClick={() =>
                              approve(maticAmount, address, childTokenAddress)
                            }
                            size="small"
                          >
                            Approve
                          </Button>
                        </OverlayTrigger>{" "}
                      </div>
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
                            Submit proof for burnt tokens and exit them from POS
                            Portal
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
                        Goerli
                      </Badge>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <UserStatus />
          </div>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default App;
