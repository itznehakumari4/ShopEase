import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  /*
    shippingAddress = {
      address,city,postalCode,country
    }

    cartItems = {
      product, name, image, price:256, countInStock, quantity
    }
  */
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (eachItem) => eachItem.product === item.product
      );
      if (existItem) {
        // if item exists, just update it
        return {
          ...state,
          cartItems: state.cartItems.map((eachItem) =>
            eachItem.product === existItem.product ? item : eachItem
          ),
        };
      } else {
        // else push it in cart
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (eachItem) => eachItem.product !== action.payload.product
        ),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload, // store the shipping address getting from dispatch
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentGateway: action.payload, // store the shipping address getting from dispatch
      };

    default:
      return state;
  }
};
