import React from "react";
import {
  Button,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  getUserTokenBalance,
  getEthBalance,
  mint,
} from "../service/web3Service";
import {
  ROOT_PROVIDER,
  CHILD_PROVIDER,
  ROOT_DUMMY_TOKEN_ADDRESS,
  CHILD_DUMMY_TOKEN_ADDRESS,
  CHILD_ETH_TOKEN_ADDRESS,
} from "../constants";


function UserStatus() {
  window.addEventListener("load", async function () {
    updateDummyTokenMaticBalance();
    updateEthRopstenBalance();
    updateEthMaticBalance();
    updateDummyTokenRopstenBalance();
  });
  const [
    dummyTokenRopstenBalance,
    setDummyTokenRopstenBalance,
  ] = React.useState("");
  const [dummyTokenMaticBalance, setDummyTokenMaticBalance] = React.useState(
    ""
  );
  const [ethRopstenBalance, setEthRopstenBalance] = React.useState("");
  const [ethMaticBalance, setEthMaticBalance] = React.useState("");
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

  const refreshMaticBalance = async () => {
    await updateEthMaticBalance();
    await updateDummyTokenMaticBalance();
  };

  const refreshRopstenBalance = async () => {
    await updateEthRopstenBalance();
    await updateDummyTokenRopstenBalance();
  };

  return (
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
              {Number.parseFloat(dummyTokenRopstenBalance).toFixed(3)} DUMMY{" "}
            </Badge>
            <Button
              className="col-md-3 balance"
              variant="outline-secondary"
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
              {Number.parseFloat(dummyTokenMaticBalance).toFixed(3)} DUMMY{" "}
            </Badge>
            <Button
              className="col-md-3 balance"
              variant="outline-secondary"
              onClick={() => refreshMaticBalance()}
            >
              Refresh
            </Button>
          </span>
        </div>
      </div>
      <div className="row-md-3">
        <div className="card">
          <h4>Mint Dummy Tokens for Testing</h4>
          <Button variant="outline-success" onClick={() => mint()} size="sm">
            Mint Dummy Tokens
          </Button>
        </div>
      </div>
      <div className="row-md-6">Transaction History(Coming Soon!!!)</div>
    </div>
  );
}
export default UserStatus;