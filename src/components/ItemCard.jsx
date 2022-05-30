
import { Row, Col, Card } from "react-bootstrap";
export default function ItemCard({ img, name, date, count }) {

  return (
    <>
      <Card className="text-white item-card">
        <Card.Body className="m-3">
          <Card.Title style={{ display: "flex" }}>
            <img
              className="d-block w-100 image-class-name"
              src={img}
              alt={name}
            />
            {count > 1 && (
              <span style={{ marginLeft: "auto", marginTop: "-1.5rem" }}>
                x{count}
              </span>
            )}
          </Card.Title>
          <Card.Subtitle className="mt-3 text-muted">{name}</Card.Subtitle>

          <Row className="mt-5">
            <Col>Gained on {date}</Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
