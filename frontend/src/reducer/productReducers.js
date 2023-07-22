import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_DETAIL_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] }; // returning a state that request is send and loading and also sending an empty products array since no products exist as of now

    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload }; // no more loading and returning error to reducer

    default:
      return state;
  }
};

export const productDetailReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { loading: true }; // returning a state that request is send and loading and also sending an empty products array since no products exist as of now

    case PRODUCT_DETAIL_SUCCESS:
      return { loading: false, product: action.payload }; // no more loading and action.payload is data passed from action to reducer

    case PRODUCT_DETAIL_FAIL:
      return { loading: false, error: action.payload }; // no more loading and returning error to reducer

    case PRODUCT_DETAIL_RESET:
      return { product: { reviews: [] } };

    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };

    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };

    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };
      
    default:
      return state;
  }
};

/******************************************ADMIN ACCESS********************************** */

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };

    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  // product details  currently is empty state and reviews is empty array
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true, product: {} }; // returning a state that request is send and loading and also sending an empty products array since no products exist as of now

    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }; // no more loading and action.payload is data passed from action to reducer

    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload }; // no more loading and returning error to reducer

    case PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  // product details  currently is empty state and reviews is empty array
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true }; // returning a state that request is send and loading and also sending an empty products array since no products exist as of now

    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true }; // no more loading and action.payload is data passed from action to reducer

    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload }; // no more loading and returning error to reducer

    case PRODUCT_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true }; // returning a state that request is send and loading and also sending an empty products array since no products exist as of now

    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }; // no more loading and action.payload is data passed from action to reducer

    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }; // no more loading and returning error to reducer

    case PRODUCT_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};
