import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, qty) => {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id, // id of the product
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity: qty,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    ); // storing the cart in localStorage as JSON string
  };
};

export const removeFromCart = (id) => {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: {
        product: data._id,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    ); // storing the cart in localStorage as JSON string
  };
};

export const saveShippingAddress = (shippingAddress) => {
  return async (dispatch, getState) => {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: shippingAddress,
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(getState().cart.shippingAddress)
    );
  };
};

export const savePaymentMethod = (PaymentGateway) => {
  // payment service provider
  return (dispatch, getState) => {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: PaymentGateway,
    });
    localStorage.setItem(
      "paymentGateway",
      JSON.stringify(getState().cart.paymentGateway)
    );
  };
};
