import { Container, Row, Col, Alert } from "react-bootstrap";
import ItemCard from "../components/ItemCard";

export default function SimpleNFTList(props) {
  const items = props.data;

  console.log(items);

  return (
    <div className="border-2 rounded-3" style={{ borderColor: "#414242" }}>
      <div className="mx-3 mt-4">
        <p className="dashboard-title h4">Your Nfts</p>
        <p className="h6 text-secondary">
          You can find varieties of nfts in mt world.
        </p>
      </div>

      {items
        .reduce((all, one, i) => {
          const ch = Math.floor(i / 4);
          all[ch] = [].concat(all[ch] || [], one);
          return all;
        }, [])
        .map((i) => (
          <Row className="my-3 mx-3">
            {i.map((j) => (
              <Col style={{ maxWidth: "20rem" }}>
                <ItemCard
                  date={j.createdTime}
                  name={j.name}
                  img={j.image}
                  count={j.balance.toString()}
                />
              </Col>
            ))}
          </Row>
        ))}
    </div>
  );
}
