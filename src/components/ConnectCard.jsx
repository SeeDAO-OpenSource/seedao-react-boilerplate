import { GoInfo } from "react-icons/go";
import { Button } from "react-bootstrap";

export default function ConnectCard(props) {
  return (
    <div className="border-2 rounded-3" style={{ borderColor: "#414242" }}>
      <div className="mt-4" style={{ display: "flex" }}>
        <div className="hcenter">
          <GoInfo size="1.75rem" />
        </div>
      </div>
      <div className="mt-2" style={{ display: "flex" }}>
        <div className="dashboard-title h4 hcenter">
          Connect your wallet to continue
        </div>
      </div>
      <div className="mt-4 mb-4" style={{ display: "flex" }}>
        <div className="dashboard-title h4 hcenter">
          <Button
            variant="outline-light"
            size="lg"
            onClick={props.connectWallet}
          >
            Connect
          </Button>
        </div>
      </div>
    </div>
  );
}
