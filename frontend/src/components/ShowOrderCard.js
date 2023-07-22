import React from "react";
import { ListGroup, Row, Col, Image, Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

const ShowOrderCard = ({ orders }) => {
  return (
    <ListGroup variant="flush">
      {orders.length === 0 ? (
        <Card>
          <Card.Body>
            <Card.Text>No orders found.</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <ListGroup variant="flush">
            {orders.map((order) => (
              <ListGroup.Item key={order._id}>
                <Card.Title>Order ID: {order._id}</Card.Title>
                <Card.Text>
                  <strong>Date Placed:</strong> {order.createdAt}<br/>
                  <strong>Payment Status:</strong>{" "}
                  {order.isPaid ? (
                    <Badge variant="success">Paid</Badge>
                  ) : (
                    <Badge variant="warning">Not Paid</Badge>
                  )}<br/>
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
                    <Col>
                      <Link to={`/product/${item.product}`} className="bold-up-link">
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={4}>
                      Quantity: {item.quantity}
                    </Col>
                  </Row>
                ))}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}
    </ListGroup>
  );
};

export default ShowOrderCard;
