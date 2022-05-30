import { useState } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "2ed53621be3149999411b8905c7ebcac",
    },
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
  providerOptions,
  theme: "dark",
});

export function useWeb3Modal(chainId) {
  const [provider, setProvider] = useState(undefined);
  const [error, setError] = useState(null);

  // Automatically connect if the provider is cashed but has not yet
  // been set (e.g. page refresh)
  if (web3Modal.cachedProvider && !provider) {
    connectWallet();
  }

  async function connectWallet() {
    try {
      const externalProvider = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(
        externalProvider,
        "any"
      );
      ethersProvider.on("network", (newNetwork, oldNetwork) => {
        // When a Provider makes its initial connection, it emits a "network"
        // event with a null oldNetwork along with the newNetwork. So, if the
        // oldNetwork exists, it represents a changing network

        if (newNetwork.chainId != chainId) {
          handleChangeNetwork(chainId);
        }
        if (oldNetwork) {
          window.location.reload();
        }
      });

      setProvider(ethersProvider);
    } catch (e) {
      setError("NO_WALLET_CONNECTED");
      console.log("NO_WALLET_CONNECTED", e);
    }
  }

  function disconnectWallet() {
    web3Modal.clearCachedProvider();
    setProvider(undefined);
  }

  const handleChangeNetwork = async (chainId) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: chainId,
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

  return { connectWallet, disconnectWallet, provider, error };
}
