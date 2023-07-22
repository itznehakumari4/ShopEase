/** 
  Documentation for the code:

Import Statements:
  * CreateStore, combineReducers, and applyMiddleware are imported from the "redux" library. These functions are
    essential for creating and configuring the Redux store.
  * Thunk is imported from the "redux-thunk" library. It is a middleware that allows handling of asynchronous actions
    in Redux.
  * ComposeWithDevTools is imported from the "redux-devtools-extension" library. It provides a development tool
    integration for Redux, allowing debugging and time-traveling of state changes.

Reducers:
  * Multiple reducer functions are imported from various files (productReducers.js, cartReducers.js, userReducers.js,
    orderReducers.js). Reducers are responsible for handling specific parts of the application state and processing actions to update the state accordingly.
  * These reducers are combined into a single reducer using the combineReducers function. The combined reducer
    represents the overall state structure of the application.

Initial State:
  * Initial values for different parts of the state are defined in the initialState object.
  * The cart property in the initial state holds the initial values for cartItems, shippingAddress, and paymentGateway.
    These values are retrieved from the localStorage if available, or set to default values.
  * The userLogin property in the initial state holds the initial value for userInfo. Similarly, the value is retrieved
    from localStorage if available, or set to null.
    
Middleware Configuration:
  * The middleware array is created, and thunk middleware is added to it. Redux Thunk allows handling of asynchronous
    actions.
  * ComposeWithDevTools is used to enhance the store with the Redux DevTools extension, which provides additional
    debugging capabilities.
  * The applyMiddleware function is used to apply the middleware array to the store.

Store Creation:
  * The Redux store is created using the createStore function.
  * It takes three arguments: the combined reducer, the initial state, and the middleware configuration.
  * The resulting store is assigned to the store variable and will be used to interact with the Redux state, dispatch
    actions, and subscribe to state changes.

Exporting the Store:
  * The created store is exported as the default export of the module.

**/


import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailReducer,
  productListReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productUpdateReducer,
} from "./reducer/productReducers";
import { cartReducer } from "./reducer/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userUpdateByAdminReducer
} from "./reducer/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer
} from "./reducer/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,

  cart: cartReducer,

  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userUpdateByAdmin: userUpdateByAdminReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []; // if there is a cart in localStorage load it in the cart...This is so that the cart is in user's localStorage so every time the user logs, it is there

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null; // if there is userInfo in localStorage, load it in userInfoFromStorage..

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentGatewayFromStorage = localStorage.getItem("paymentGateway")
  ? JSON.parse(localStorage.getItem("paymentGateway"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentGateway: paymentGatewayFromStorage,
  }, // this will be kept locally
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
