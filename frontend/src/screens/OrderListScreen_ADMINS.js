import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders_ADMINS_ONLY } from "../actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { Button, Table, Row, Col } from "react-bootstrap";

const OrderListScreen_ADMINS = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // to show if a user is currently logged in or not
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, orders } = orderDetails;

  useEffect(() => {
    if (!userInfo || userInfo.isAdmin === false) {
      // if not admin or not logged in
      navigate("/login");
    } else {
      dispatch(getOrders_ADMINS_ONLY());
    }
  }, [dispatch, navigate, userInfo]);

  const loadOrderDetailsPage = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>USER ID</th>
              <th>USER NAME</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((eachOrder) => (
              <tr key={eachOrder._id}>
                <td>{eachOrder._id}</td>
                <td>{eachOrder.user._id}</td>
                <td>{eachOrder.user.name}</td>
                <td>{eachOrder.createdAt.substring(0, 10)}</td>
                <td>${eachOrder.totalPrice}</td>
                <td>
                  {eachOrder.isPaid ? (
                    eachOrder.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {eachOrder.isDelivered===true ? (
                    eachOrder.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Button
                    variant="white"
                    className="btn-sm"
                    onClick={() => loadOrderDetailsPage(eachOrder._id)}
                  >
                    <i className="fas fa-edit"></i>
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen_ADMINS;
