import React from "react";
import { Button, Navbar, Form, InputGroup, FormControl } from "react-bootstrap";
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
} from "../service/web3Service";
import {
  ROOT_PROVIDER,
  CHILD_PROVIDER,
  ROOT_DUMMY_TOKEN_ADDRESS,
  CHILD_DUMMY_TOKEN_ADDRESS,
  ROOT_ETH_TOKEN_ADDRESS,
  CHILD_ETH_TOKEN_ADDRESS,
} from "../constants";

const [tokenAddress, setTokenAddress] = React.useState("");
const [amount, setAmount] = React.useState(0);

function InputForm() {
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-3 p-0">
          <FormControl
            placeholder="Select Token"
            aria-label="Select Token"
            aria-describedby="token"
            as="select"
            size="small"
            custom
          >
            <option onChange={() => setTokenAddress(ROOT_ETH_TOKEN_ADDRESS)}>
              ETH
            </option>
            <option onChange={() => setTokenAddress(ROOT_DUMMY_TOKEN_ADDRESS)}>
              DUMMY
            </option>
          </FormControl>
        </div>
        <div class="col-md-3 p-0">
          <FormControl
            type="string"
            name="amount"
            id="amount"
            placeholder="Amount"
            value={amount || ""}
            onChange={(e) => setAmount(e.target.value)}
          ></FormControl>
        </div>
      </div>
    </div>
  );
}
export default InputForm;
