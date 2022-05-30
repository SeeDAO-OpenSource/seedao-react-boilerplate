import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Web3Account from "./Web3Account";

export default function Header({
  provider,
  connectWallet,
  disconnectWallet,
  signerAddress,
}) {
  return (
    <Navbar
      style={{ backgroundColor: "#222230" }}
      variant="dark"
      className="sticky-top shadow-sm opacity-75"
      expand="md"
      collapseOnSelect
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src="/logo.png"
            width="36"
            height="36"
            className="d-inline-block align-top"
            alt="MT3 logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto h5">
            <Nav.Link as={NavLink} to="/">
              Dashboard
            </Nav.Link>
            
            <Nav.Link as={NavLink} to="/marketplace" disabled>
              Marketplace
            </Nav.Link>
          
            <Nav.Link as={NavLink} to="//coltiyefyu.gitbook.io/mt3/">
              Docs
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
          <Web3Account
            connectWallet={connectWallet}
            disconnectWallet={disconnectWallet}
            provider={provider}
            signerAddress={signerAddress}
          />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </Container>
    </Navbar>
  );
}
