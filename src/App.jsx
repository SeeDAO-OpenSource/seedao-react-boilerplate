import { useEffect, useState } from "react";
import { useWeb3Modal } from "./hooks/web3";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";

import "./theme/global.css";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const CHAINID = process.env.REACT_APP_CHAINID ?? "0x3";

function App() {
  const { connectWallet, disconnectWallet, provider, error } = useWeb3Modal(CHAINID);

  const [signerAddress, setSignerAddress] = useState("");

  useEffect(() => {
    const getAddress = async () => {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setSignerAddress(address);
    };
    if (provider) getAddress();
    else setSignerAddress("");

  }, [provider]);

  const handleChangeNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: CHAINID }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: CHAINID,
                chainName: "ropsten",
                rpcUrls: [
                  "https://mainnet.infura.io/v3/2ed53621be3149999411b8905c7ebcac",
                ] /* ... */,
              },
            ],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  };

  return (
    <div
      style={{ backgroundColor: "#191927"}}
    >
      <Header
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        provider={provider}
        signerAddress={signerAddress}
      />
      <Routes>
        <Route exact path="/" element={<Dashboard provider={provider} signerAddress={signerAddress} connectWallet={connectWallet} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
