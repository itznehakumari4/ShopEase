import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_RESET,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_LIST_USER_DELETE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} from "../constants/userContants";

export const userLoginReducer = (state = {}, action) => {
  // empty object
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, userInfo: null };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }; // no more loading and action.payload is data passed from action to reducer

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }; // no more loading and returning error to reducer

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  // empty object
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, userInfo: null };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }; // no more loading and action.payload is data passed from action to reducer

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }; // no more loading and returning error to reducer

    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (
  state = { user: null, orderList: [] },
  action
) => {
  // empty object
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true, user: null, orderList: [] };

    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload.user,
        orderList: action.payload.orderList,
      }; // no more loading and action.payload is data passed from action to reducer

    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }; // no more loading and returning error to reducer

    case USER_DETAILS_RESET:
      return { user: null, orderList: [] };

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  // empty object
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true, user: null };

    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, user: action.payload }; // to notify the success notification on screens component

    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    case USER_UPDATE_PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

/************************************ADMIN PRIVELEGES ACTIONS***************************************** */

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };

    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }; // to notify the success notification on screens component

    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };

    case USER_LIST_USER_DELETE:
      return {
        ...state,
        users: state.users.filter(
          (eachUser) => eachUser._id !== action.payload.User_ID_Delete
        ),
        success: true,
      };

    case USER_LIST_RESET:
      return { users: [] };

    default:
      return state;
  }
};

export const userUpdateByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST: {
      return { loading: true };
    }

    case USER_UPDATE_SUCCESS: {
      return { loading: false, success: true };
    }

    case USER_UPDATE_FAIL: {
      return { loading: false, error: action.payload };
    }

    case USER_UPDATE_RESET: {
      return {}
    }

    default:
      return state;
  }
};
