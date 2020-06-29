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
    updateEthGoerliBalance();
    updateEthMaticBalance();
    updateDummyTokenGoerliBalance();
  });
  const [
    dummyTokenGoerliBalance,
    setDummyTokenGoerliBalance,
  ] = React.useState("");
  const [dummyTokenMaticBalance, setDummyTokenMaticBalance] = React.useState(
    ""
  );
  const [ethGoerliBalance, setEthGoerliBalance] = React.useState("");
  const [ethMaticBalance, setEthMaticBalance] = React.useState("");
  const updateDummyTokenGoerliBalance = async () => {
    const dummyGoerliBalance = await getUserTokenBalance(
      ROOT_DUMMY_TOKEN_ADDRESS,
      ROOT_PROVIDER
    );
    await setDummyTokenGoerliBalance(dummyGoerliBalance);
  };
  const updateEthGoerliBalance = async () => {
    const GoerliBalance = await getEthBalance(ROOT_PROVIDER);
    await setEthGoerliBalance(GoerliBalance);
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

  const refreshGoerliBalance = async () => {
    await updateEthGoerliBalance();
    await updateDummyTokenGoerliBalance();
  };

  return (
    <div className="col-md-6">
      <div className="row-md-3">
        <div className="card">
        <h4>User Balance</h4>
          <span className="row">
            <Badge className="col-md-2 balance" variant="success">
              Goerli
            </Badge>{" "}
            <Badge className="col-md-4 balance">
              {Number.parseFloat(ethGoerliBalance).toFixed(3)} ETH{" "}
            </Badge>
            <Badge className="col-md-4 balance">
              {Number.parseFloat(dummyTokenGoerliBalance).toFixed(3)} DUMMY{" "}
            </Badge>
            <Button
              className="col-md-2 balance"
              variant="outline-secondary"
              onClick={() => refreshGoerliBalance()}
            >
              Refresh
            </Button>
          </span>
          <span className="row">
            <Badge className="col-md-2 balance" variant="primary">
              Matic
            </Badge>{" "}
            <Badge className="col-md-4 balance">
              {Number.parseFloat(ethMaticBalance).toFixed(3)} ETH{" "}
            </Badge>
            <Badge className="col-md-4 balance">
              {Number.parseFloat(dummyTokenMaticBalance).toFixed(3)} DUMMY{" "}
            </Badge>
            <Button
              className="col-md-2 balance"
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
          <h4>Mint Tokens for Testing</h4>
          <Button variant="outline-success" onClick={() => mint(ROOT_DUMMY_TOKEN_ADDRESS)} size="sm">
            Dummy Tokens
          </Button>
        </div>
      </div>
      <div className="row-md-6">Transaction History(Coming Soon!!!)</div>
    </div>
  );
}
export default UserStatus;
