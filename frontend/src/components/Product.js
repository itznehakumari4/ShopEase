import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

const Product = ({ product }) => {
  const navigate = useNavigate();

  const productPage = () => {
    // go to product page
    navigate(`/product/${product._id}`);
  };

  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img src={product.image} variant="top" onClick={productPage} />

      <Card.Body>
        <Card.Title as="div" onClick={productPage}>
          <strong>{product.name}</strong>
        </Card.Title>

        <Card.Text as="div">
          <Rating value={product.rating} text={product.numReviews} />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
