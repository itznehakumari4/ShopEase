import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_LIST_USER_DELETE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/userContants";
import {
  ORDER_DETAILS_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import { PRODUCT_DETAIL_RESET } from "../constants/productConstants";
import axios from "axios";

export const login = ({ email, password }) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });

      const config = {
        // https://www.freecodecamp.org/news/what-is-the-correct-content-type-for-json-request-header-mime-type-explained/
        headers: {
          "Content-Type": "application/json",
          // This means when you're sending JSON to the server or receiving JSON from the server, you should always declare the Content-Type of the header as application/json as this is the standard that the client and server understand.
        },
      };

      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      ); // userControllerAuth expects email and password
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem(
        "userInfo",
        JSON.stringify(getState().userLogin.userInfo)
      ); // storing the userInfo in localStorage as JSON string
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    localStorage.removeItem("userInfo"); // removes the item from localstorage
    dispatch({
      type: USER_LOGOUT,
    });
    dispatch({
      // Reset user details
      type: USER_DETAILS_RESET,
    });
    dispatch({
      // reset the update profile
      type: USER_UPDATE_PROFILE_RESET,
    });
    dispatch({
      type: USER_LIST_RESET,
    });
    dispatch({
      type: USER_REGISTER_RESET,
    });
    dispatch({
      type: ORDER_DETAILS_RESET,
    });
    dispatch({
      type: ORDER_PAY_RESET,
    });
    dispatch({
      type: PRODUCT_DETAIL_RESET,
    });
  };
};

export const register = ({ name, email, password }) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        // https://www.freecodecamp.org/news/what-is-the-correct-content-type-for-json-request-header-mime-type-explained/
        headers: {
          "Content-Type": "application/json",
          // This means when you're sending JSON to the server or receiving JSON from the server, you should always declare the Content-Type of the header as application/json as this is the standard that the client and server understand.
        },
      };

      const { data } = await axios.post(
        "/api/users",
        { name, email, password },
        config
      ); // userControllerAuth expects email and password
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        // logging the user right away
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem(
        "userInfo",
        JSON.stringify(getState().userLogin.userInfo)
      ); // storing the userInfo in localStorage as JSON string
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateUserProfile = (user) => {
  // DISPATCHING A USER OBJECT WITH {name,email,password}
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

      const { userInfo } = getState().userLogin;
      const config = {
        // https://www.freecodecamp.org/news/what-is-the-correct-content-type-for-json-request-header-mime-type-explained/
        headers: {
          // This means when you're sending JSON to the server or receiving JSON from the server, you should always declare the Content-Type of the header as application/json as this is the standard that the client and server understand.
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`, // Taken by protect middleware
        },
      };

      const { data } = await axios.put(`/api/users/profile`, user, config);
      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });

      dispatch({
        // to change the user state in navbar
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_DETAILS_REQUEST,
      });

      localStorage.setItem(
        "userInfo",
        JSON.stringify(getState().userLogin.userInfo)
      ); // update the changes in localstate as well
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getUserDetails = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });

      const { userInfo } = getState().userLogin;

      const config = {
        // https://www.freecodecamp.org/news/what-is-the-correct-content-type-for-json-request-header-mime-type-explained/
        headers: {
          // This means when you're sending JSON to the server or receiving JSON from the server, you should always declare the Content-Type of the header as application/json as this is the standard that the client and server understand.
          Authorization: `Bearer ${userInfo.token}`, // Taken by protect middleware
        },
      };

      const { data } = await axios.get(`/api/users/profile`, config); // userControllerAuth expects email and password
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: {
          user: {
            _id: data._id,
            name: data.name,
            email: data.email,
            isAdmin: data.isAdmin,
          },
          orderList: data.orderList,
        },
      });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

/************************************ADMIN PRIVELEGES ACTIONS***************************************** */

export const listUsers_ADMINS_ONLY = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LIST_REQUEST });

      const { userInfo } = getState().userLogin;

      const config = {
        // https://www.freecodecamp.org/news/what-is-the-correct-content-type-for-json-request-header-mime-type-explained/
        headers: {
          // This means when you're sending JSON to the server or receiving JSON from the server, you should always declare the Content-Type of the header as application/json as this is the standard that the client and server understand.
          Authorization: `Bearer ${userInfo.token}`, // Taken by protect middleware
        },
      };

      const { data } = await axios.get(`/api/users`, config); // userController Admin privelege
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const DeleteUser_ADMINS_ONLY = (deleteUserID) => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;

    const config = {
      // https://www.freecodecamp.org/news/what-is-the-correct-content-type-for-json-request-header-mime-type-explained/
      headers: {
        // This means when you're sending JSON to the server or receiving JSON from the server, you should always declare the Content-Type of the header as application/json as this is the standard that the client and server understand.
        Authorization: `Bearer ${userInfo.token}`, // Taken by protect middleware
      },
    };

    const { data } = await axios.delete(`/api/users/${deleteUserID}`, config); // userController Admin privelege
    dispatch({
      type: USER_LIST_USER_DELETE,
      payload: {
        User_ID_Delete: data._id,
      },
    });
  };
};

export const UserDetails_ADMINS_ONLY = (userID) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });

      const { userInfo } = getState().userLogin;

      const config = {
        // https://www.freecodecamp.org/news/what-is-the-correct-content-type-for-json-request-header-mime-type-explained/
        headers: {
          // This means when you're sending JSON to the server or receiving JSON from the server, you should always declare the Content-Type of the header as application/json as this is the standard that the client and server understand.
          Authorization: `Bearer ${userInfo.token}`, // Taken by protect middleware
        },
      };

      const { data } = await axios.get(`/api/users/${userID}`, config); // userControllerAuth expects email and password
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: {
          user: {
            _id: data._id,
            name: data.name,
            email: data.email,
            isAdmin: data.isAdmin,
          },
          orderList: [],
        },
      });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const UserUpdateDetails_ADMINS_ONLY = (ToUpdateuser) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });
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
        `/api/users/${ToUpdateuser._id}`,
        ToUpdateuser,
        config
      );

      dispatch({
        type: USER_UPDATE_SUCCESS,
      });

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: {
          user: {
            _id: data._id,
            name: data.name,
            email: data.email,
            isAdmin: data.isAdmin,
          },
          orderList: [],
        },
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
