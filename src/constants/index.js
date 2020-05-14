import TEST_TOKEN from "./abi/TestToken.json"
import ROOT_CHAIN_MANAGER from "./artifacts/RootChainManager.json"
import CHILD_CHAIN_MANAGER from "./artifacts/ChildChainManager.json"
import CHILD_DUMMY_TOKEN from "./artifacts/ChildToken.json"
import ROOT_DUMMY_TOKEN from "./artifacts/DummyToken.json"
import CHILD_ETH_TOKEN from "./artifacts/WETH.json"
import ROOT_NA_DUMMY_TOKEN from "./abi/TestToken.json"
import CHILD_NA_DUMMY_TOKEN from "./abi/ChildTestToken.json"
import ERC20 from "./abi/ERC20.json";
import {TOKEN_LIST} from "./TokenAddress.js";
import CONTRACT_ADDRESS from "./ContractAddress.json"

export const ROOT_PROVIDER = CONTRACT_ADDRESS.root.RPC;
export const CHILD_PROVIDER = CONTRACT_ADDRESS.child.RPC;

export const TEST_TOKEN_ABI = TEST_TOKEN;
export const ERC20_ABI = ERC20;
export const ROOT_CHAIN_MANAGER_ABI = ROOT_CHAIN_MANAGER.abi;
export const CHILD_CHAIN_MANAGER_ABI = CHILD_CHAIN_MANAGER.abi;
export const CHILD_DUMMY_TOKEN_ABI = CHILD_DUMMY_TOKEN.abi;
export const ROOT_DUMMY_TOKEN_ABI = ROOT_DUMMY_TOKEN.abi;
export const CHILD_ETH_TOKEN_ABI = CHILD_ETH_TOKEN.abi;
export const ROOT_NA_DUMMY_TOKEN_ABI = ROOT_NA_DUMMY_TOKEN;
export const CHILD_NA_DUMMY_TOKEN_ABI = CHILD_NA_DUMMY_TOKEN;


export const ROOT_CHAIN_MANAGER_ADDRESS = CONTRACT_ADDRESS.root.POSRootChainManager;
export const CHILD_CHAIN_MANAGER_ADDRESS = CONTRACT_ADDRESS.child.ChildChainManager;
export const ROOT_DUMMY_TOKEN_ADDRESS = CONTRACT_ADDRESS.root.DummyToken;
export const CHILD_DUMMY_TOKEN_ADDRESS = CONTRACT_ADDRESS.child.DummyToken;
export const PLASMA_ROOT_CHAIN_ADDRESS = CONTRACT_ADDRESS.root.PlasmaRootChain;
export const ROOT_ETH_TOKEN_ADDRESS = CONTRACT_ADDRESS.root.WETH;
export const CHILD_ETH_TOKEN_ADDRESS = CONTRACT_ADDRESS.child.ETH;
export {TOKEN_LIST};