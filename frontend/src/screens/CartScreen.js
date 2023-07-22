import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
  const { id } = useParams();
  const productId = id;

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Here's a breakdown of the expression:
  // 1) location.search retrieves the query string portion of the URL.
  // 2) split('=') splits the string at the equals sign, creating an array with two elements: ["?qty", "5"].
  // 3) [1] accesses the second element of the array, which is the value "5" in this case. It will be a string, convert to number.
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, qty, productId]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>Your cart is empty!</Message>
        ) : (
          <ListGroup variant="flush" >
            {cartItems.map((eachItem) => (
              <ListGroup.Item key={eachItem.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={eachItem.image}
                      alt={eachItem.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${eachItem.product}`}>
                      {eachItem.name}
                    </Link>
                  </Col>
                  <Col md={2}>${eachItem.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={eachItem.quantity}
                      // if the user changes the quantity fire the dispatch
                      onChange={(e) =>
                        dispatch(
                          addToCart(eachItem.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(eachItem.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(eachItem.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce(
                  (acc, eachItem) => acc + eachItem.quantity,
                  0
                )}
                ) items
              </h2>
              $
              {cartItems
                .reduce(
                  (acc, eachItem) => acc + eachItem.quantity * eachItem.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Checkout
            </Button>
          </ListGroup>
        </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default CartScreen;
