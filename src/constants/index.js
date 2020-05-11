import TEST_TOKEN from "./abi/TestToken.json"
import ROOT_CHAIN_MANAGER from "./artifacts/RootChainManager.json"
import CHILD_CHAIN_MANAGER from "./artifacts/ChildChainManager.json"
import CHILD_DUMMY_TOKEN from "./artifacts/ChildToken.json"
import ROOT_DUMMY_TOKEN from "./artifacts/DummyToken.json"
import ERC20 from "./abi/ERC20.json";
import {TOKEN_LIST} from "./TokenAddress.js";
import CONTRACT_ADDRESS from "./ContractAddress.json"

export const TEST_TOKEN_ABI = TEST_TOKEN;
export const ERC20_ABI = ERC20;
export const ROOT_CHAIN_MANAGER_ABI = ROOT_CHAIN_MANAGER.abi;
export const CHILD_CHAIN_MANAGER_ABI = CHILD_CHAIN_MANAGER.abi;
export const CHILD_DUMMY_TOKEN_ABI = CHILD_DUMMY_TOKEN.abi;
export const ROOT_DUMMY_TOKEN_ABI = ROOT_DUMMY_TOKEN.abi;


export const ROOT_CHAIN_MANAGER_ADDRESS = CONTRACT_ADDRESS.root.RootChainManager;
export const CHILD_CHAIN_MANAGER_ADDRESS = CONTRACT_ADDRESS.child.ChildChainManager;
export const ROOT_DUMMY_TOKEN_ADDRESS = CONTRACT_ADDRESS.root.DummyToken;
export const CHILD_DUMMY_TOKEN_ADDRESS = CONTRACT_ADDRESS.child.DummyToken;
export {TOKEN_LIST};