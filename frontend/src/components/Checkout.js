import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Checkout = ({ login, shipping, payment, orders }) => {
  const navigate = useNavigate();

  const clickHandler = (route) => {
    navigate(`/${route}`);
  };

  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        <Nav.Link
          onClick={() => clickHandler("")}
          disabled={!login}
          style={{ cursor: "default" }}
          className={login ? "bounce-up-link hover" : ""}
        >
          Sign In
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          onClick={() => clickHandler("shipping")}
          disabled={!shipping}
          style={{ cursor: "default" }}
          className={shipping ? "bounce-up-link hover" : ""}
        >
          Shipping
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          onClick={() => clickHandler("payment")}
          disabled={!payment}
          style={{ cursor: "default" }}
          className={payment ? "bounce-up-link hover" : ""}
        >
          Payment
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link
          onClick={() => clickHandler("orders")}
          disabled={!orders}
          style={{ cursor: "default" }}
          className={orders ? "bounce-up-link hover" : ""}
        >
          Order
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Checkout;
