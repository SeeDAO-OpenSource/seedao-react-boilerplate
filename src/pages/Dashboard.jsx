import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import SimpleNFTList from "../components/SimpleNFTList";
import ConnectCard from "../components/ConnectCard";

import { ethers } from "ethers";

import MockNFTABI from "../config/abi/contracts_mock1155_sol_MyToken.abi.json" ;
const CONTRACT_ADDR = "0xbDb1668241E24238c8566F11d8bAa2D2b199f79E";

// const commify = ethers.utils.commify;
// const formatUnits = ethers.utils.formatUnits;
// //const parseUnits = ethers.utils.parseUnits;

const mockData = [
  {
    createdTime: "05/30/22",
    name: 1,
    balance: 1,
    image:
      "https://ipfs.io/ipfs/QmVSEhnjg2ddZj1RR8zY4yXKvV3w2hLADPqRCFLpfwVzc9",
    metadata:
      "https://ipfs.io/ipfs/QmVtbzAredBKySc1vxds8bNNB1iDvYyNa7VV3S4d8yHgqb/1",
  },
];

export default function Dashboard(props) {
  const [items, setItems] = useState(mockData);
  const provider =
    props.provider ||
    ethers.getDefaultProvider("ropsten", {
      infura: process.env.REACT_APP_DEFAULT_INFURA_ID,
    });
  const signerAddress = props.signerAddress;

  const loadData = async () => {
    const address = CONTRACT_ADDR;
    const contractWithSigner = new ethers.Contract(
      ethers.utils.getAddress(address.toLowerCase()),
      MockNFTABI,
      provider
    );

    let promise = new Promise((resolve, reject) => {
      let pms = [];

      pms.push(
        //mock data, ignore this
        contractWithSigner
          .balanceOfBatch(
            Array(9).fill(props.signerAddress),
            Array(9)
              .fill("")
              .map((_, i) => i + 1)
          )
          .then((data) => {
            return { balances: data };
          })
          .catch((e) => {
            return { balances: Array(9).fill(0) };
          })
      );

      Promise.all(pms)
        .then(
          (res) => {
            resolve(res);
          },
          (reason) => {
            reject(reason);
          }
        )
        .catch((error) => console.log(`can't : ${error.message}`));
    });

    return promise;
  };


  const doMint = () => {
    const address = CONTRACT_ADDR;
    const contractWithSigner = new ethers.Contract(
      ethers.utils.getAddress(address.toLowerCase()),
      MockNFTABI,
      provider.getSigner()
    );

    //some signature need to be verified
    return contractWithSigner
      .mint(signerAddress, Math.floor(Math.random() * 10), 1, 1234)
      .then((data) => {
        return data;
      })
      .catch((e) => {
        return null;
      });
  };
  

  useEffect(() => {

    signerAddress &&
      loadData().then((res) => {
        res[0].balances.filter((b) => b != 0).length != 0 &&
          setItems(
            res[0].balances
              .map((b, i) => {
                if (b != 0)
                  return {
                    createdTime: "05/20/22",
                    name: i + 1,
                    balance: b,
                    image:
                      "https://ipfs.io/ipfs/QmVSEhnjg2ddZj1RR8zY4yXKvV3w2hLADPqRCFLpfwVzc9",
                    metadata:
                      "https://ipfs.io/ipfs/QmVtbzAredBKySc1vxds8bNNB1iDvYyNa7VV3S4d8yHgqb/" +
                      b.toString(),
                  };
              })
              .filter((i) => i != undefined)
          );
      });
  }, [signerAddress]);

  return (
    <Container fluid="md" style={{ minHeight: "100vh" }} className="text-light">
      <Row className="mt-3">
        <Col sm={{ span: 12, offset: 0 }}>
          {signerAddress ? (
            <SimpleNFTList
              provider={props.provider}
              signerAddress={signerAddress}
              data={items}
            />
          ) : (
            <ConnectCard connectWallet={props.connectWallet} />
          )}
        </Col>
      </Row>
      {signerAddress ? (<Row className="mt-5 ms-3">
        <Col >
          <Button
              variant="outline-light"
              size="md"
              onClick={doMint}
            >
            Mint 1 more
          </Button>
        </Col>
      </Row>) : null
      }

      <Row className="mt-5"></Row>
      <Row className="mt-5"></Row>
      <Row className="mt-5"></Row>
      <Row className="mt-5"></Row>
    </Container>
  );
}
