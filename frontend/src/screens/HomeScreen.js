import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { Row, Col } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import ProductPamplet from "../components/ProductPamplet";
import PageMeta from "../components/PageMeta";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "./Paginate";
import { Link, useParams } from "react-router-dom";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();

  const current_pageNumber = pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList); // we are getting the states of products from the reducer in store.js
  const { loading, error, products, page, pages } = productList; // destructuring the required states

  useEffect(() => {
    dispatch(listProducts(keyword, current_pageNumber));
  }, [dispatch, keyword, current_pageNumber]);

  return (
    <>
      <PageMeta />
      {!keyword ? (
        <ProductPamplet />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1 style={{ textAlign: "center" }}>Latest Products</h1>
      {loading ? (
        <></>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {products.length === 0 && (
            <Message variant="warning">No products to show...</Message>
          )}
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={13} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};
export default HomeScreen;
