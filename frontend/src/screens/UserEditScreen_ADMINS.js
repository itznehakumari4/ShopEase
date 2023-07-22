import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  UserDetails_ADMINS_ONLY,
  UserUpdateDetails_ADMINS_ONLY,
} from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userContants";
import FormContainer from "../components/FormContainer";

const UserEditScreen_ADMINS = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, SetisAdmin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id: userId } = useParams(); // renamed it as userId

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails; // userInfo is the successfully created userModel Schema based json response

  const userUpdateByAdmin = useSelector((state) => state.userUpdateByAdmin);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdateByAdmin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      UserUpdateDetails_ADMINS_ONLY({ _id: userId, name, email, isAdmin })
    );
  };

  useEffect(() => {
    if (!user || user._id !== userId) {
      //if user not loaded, or, the id of the url does not match the userId
      dispatch(UserDetails_ADMINS_ONLY(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      SetisAdmin(user.isAdmin);
    }
    if (successUpdate) {
      dispatch({
        type: USER_UPDATE_RESET
      })
      navigate("/admin/userList");
    }
  }, [dispatch, navigate, successUpdate, userId, user]);


  return (
    <>
      <Link to="/admin/userList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Update User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin?"
                checked={isAdmin}
                onChange={(e) => SetisAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen_ADMINS;
