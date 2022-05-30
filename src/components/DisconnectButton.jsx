import { Button } from "react-bootstrap";
import { BiExit } from "react-icons/bi";

export default function DisconnectButton({ disconnectWallet, signerAddress }) {


  const handleClick = () => {
    disconnectWallet();
    window.location.href = "/";
  };

  return signerAddress ? (
        <Button
    variant="outline-light"
    onClick={handleClick}
    className="ms-1"
    size="md"
  >
      <BiExit
        onClick={handleClick}
            size="1.25rem"
          />
          </Button>
  ) : (
    <></>
  );
}
