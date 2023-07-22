import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Checkout from "../components/Checkout";
import { createOrder } from "../actions/orderActions";

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, paymentGateway } = cart;
  
  // calculate price
  const itemsPrice = addDecimals(
    cartItems.reduce(
      (acc, eachItem) => acc + eachItem.price * eachItem.quantity,
      0
    )
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 50);
  const taxPrice = addDecimals(Number((0.1 * itemsPrice).toFixed(2)));
  const totalPrice = addDecimals(
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)
  );

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [navigate, success]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        // this goes to createOrder action and then sent to addOrder controller
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentGateway: paymentGateway,
        itemsPrice: itemsPrice,
        taxPrice: taxPrice,
        shippingPrice: shippingPrice,
        totalPrice: totalPrice,
      })
    );
  };

  return (
    <>
      <Checkout login="true" shipping="true" payment="true" orders="true" />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>
              <strong>Gateway: </strong>
              {paymentGateway}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Orders</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty!</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((eachItem, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={eachItem.image}
                            alt={eachItem.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link
                            to={`/product/${eachItem.product}`}
                            className="bold-up-link"
                          >
                            {eachItem.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {eachItem.quantity} x ${eachItem.price} = $
                          {eachItem.quantity * eachItem.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {loading && <Loader />}
                {error && <Message variant="danger">{error}</Message>}
                {success && <Message variant="success">Order created!</Message>}
              </ListGroup.Item>

              <ListGroup.Item style={{ display: "contents" }}>
                <Button
                  style={{ margin: "7px" }}
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
