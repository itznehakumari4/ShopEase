import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
} from "../constants/orderConstants";
import axios from "axios";

export const createOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST });

      const { userInfo } = getState().userLogin;
      const config = {
        // https://www.freecodecamp.org/news/what-is-the-correct-content-type-for-json-request-header-mime-type-explained/
        headers: {
          // This means when you're sending JSON to the server or receiving JSON from the server, you should always declare the Content-Type of the header as application/json as this is the standard that the client and server understand. Content-Type is required while sending post,put request as it requires sending data as json here
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`, // Taken by protect middleware
        },
      };

      const { data } = await axios.post(
        "/api/orders",
        order, // to be accessed by req.body in orders controller
        config
      );
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getOrderDetails = (OrderId) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });

      const { userInfo } = getState().userLogin;
      const config = {
        // https://www.freecodecamp.org/news/what-is-the-correct-content-type-for-json-request-header-mime-type-explained/
        headers: {
          Authorization: `Bearer ${userInfo.token}`, // Taken by protect middleware
        },
      };

      const { data } = await axios.get(`/api/orders/${OrderId}`, config);
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: {
          orderInfo: data,
          orders: []
        },
      });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateOrderPayStatus = (orderId, paymentStatus) => {
  // paymentStatus updated in controller
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });

      const { userInfo } = getState().userLogin;
      const config = {
        // https://www.freecodecamp.org/news/what-is-the-correct-content-type-for-json-request-header-mime-type-explained/
        headers: {
          // This means when you're sending JSON to the server or receiving JSON from the server, you should always declare the Content-Type of the header as application/json as this is the standard that the client and server understand.
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`, // Taken by protect middleware
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay_status`,
        paymentStatus, // see the paymentStatus controller
        config
      );
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

// ----------------------------ADMINS ONLY----------------------------

export const getOrders_ADMINS_ONLY = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });

      const { userInfo } = getState().userLogin;
      const config = {
        // https://www.freecodecamp.org/news/what-is-the-correct-content-type-for-json-request-header-mime-type-explained/
        headers: {
          Authorization: `Bearer ${userInfo.token}`, // Taken by protect middleware
        },
      };

      const { data } = await axios.get("/api/orders", config);
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: {
          orderInfo: {},
          orders: data,
        },
      });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateOrderDeliverStatus = (orderId) => {
  // paymentStatus updated in controller
  return async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DELIVER_REQUEST });

      const { userInfo } = getState().userLogin;
      const config = {
        // https://www.freecodecamp.org/news/what-is-the-correct-content-type-for-json-request-header-mime-type-explained/
        headers: {
          // This means when you're sending JSON to the server or receiving JSON from the server, you should always declare the Content-Type of the header as application/json as this is the standard that the client and server understand.
          Authorization: `Bearer ${userInfo.token}`, // Taken by protect middleware
        },
      };

      const { data } = await axios.put(
        `/api/orders/${orderId}/delivery_status`, 
        {},
        config
      );
      dispatch({
        type: ORDER_DELIVER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ORDER_DELIVER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
