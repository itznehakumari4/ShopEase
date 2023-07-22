import React from "react";
import { ListGroup, Row, Col, Image, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {
  // Function to convert date and time to desired format
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const day = dateTime.getDate().toString().padStart(2, "0");
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    const year = dateTime.getFullYear();
    let hours = dateTime.getHours();
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const time = `${hours}:${minutes} ${ampm}`;
    const date = `${day}/${month}/${year}`;
    return { date, time };
  };

  return (
    <ListGroup variant="flush">
      {order.length === 0 ? (
        <Card>
          <Card.Body>
            <Card.Text>No orders found.</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Card
          key={order._id}
          className="mb-4"
          style={{ borderRadius: "20px", border: "3px solid black" }}
        >
          <ListGroup variant="flush">
            <ListGroup.Item key={order._id}>
              <Card.Title>Order ID: {order._id}</Card.Title>
              <Card.Text>
                <strong>Date Placed:</strong>{" "}
                {formatDateTime(order.createdAt).date}
                <br />
                <strong>Time:</strong> {formatDateTime(order.createdAt).time}
                <br />
                <strong>Payment Status:</strong>{" "}
                {order.isPaid ? (
                  <Badge variant="success">Paid</Badge>
                ) : (
                  <Badge variant="warning">Not Paid</Badge>
                )}
                <br />
                <strong>Delivery Status:</strong>{" "}
                {order.isDelivered ? (
                  <Badge variant="success">Delivered</Badge>
                ) : (
                  <Badge variant="warning">Not Delivered</Badge>
                )}
              </Card.Text>
              {order.orderItems.map((item) => (
                <Row key={item._id}>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col style={{ display: "flex", alignItems: "center" }}>
                    <Link
                      to={`/product/${item.product}`}
                      className="bold-up-link"
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={4} style={{ display: "flex", alignItems: "center" }}>
                    Quantity: {item.quantity}
                  </Col>
                </Row>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      )}
    </ListGroup>
  );
};

export default OrderCard;
