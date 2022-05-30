import ConnectButton from "./ConnectButton";
import DisconnectButton from "./DisconnectButton";

export default function Web3Account({
  provider,
  connectWallet,
  disconnectWallet,
  signerAddress,
}) {

  function handleConnectWallet() {
    connectWallet();
  }

  function onRedirect() {
    window.location.href = "/";
  }

  return (
    <>
      <ConnectButton
        handleOpenModal={onRedirect}
        handleConnectWallet={handleConnectWallet}
        signerAddress={signerAddress}
      />
      <DisconnectButton
        disconnectWallet={disconnectWallet}
        signerAddress={signerAddress}
      />
    </>
  );
}
