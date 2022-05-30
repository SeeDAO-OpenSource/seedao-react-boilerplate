import { Button } from "react-bootstrap";
import Identicon from "./Identicon";

export default function ConnectButton({
  handleClick,
  handleConnectWallet,
  signerAddress,
}) {

  return signerAddress ? (

      <Button
      variant="outline-light"
        onClick={handleClick}
        style={{display:"flex"}}
      ><Identicon address={signerAddress} />
        <span>
          {signerAddress &&
              `${signerAddress.slice(0, 4)}...${signerAddress.slice(
                signerAddress.length - 3,
                signerAddress.length
              )}`}
        </span>
        
      </Button>
  ) : (
  <Button
    variant="outline-light"
    size="md"
    onClick={handleConnectWallet}
  >
      Connect
    </Button>
  );
}
