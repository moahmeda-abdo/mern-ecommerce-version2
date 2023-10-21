import { createContext, useReducer } from "react";

// Create a context for the store
export const Store = createContext();

// Define the initial state for the store
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  cart: {
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : "",
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

// Define the reducer function to handle state updates
function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      // Add an item to the cart
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    case "CART_REMOVE_ITEM":
      // Remove an item from the cart
      const cartItemsAfterRemoval = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItemsAfterRemoval));
      return { ...state, cart: { ...state.cart, cartItems: cartItemsAfterRemoval } };

    case "CART_CLEAR":
      // Clear the entire cart
      localStorage.removeItem("cartItems");
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case "USER_SIGNIN":
      // Update user sign-in status
      return { ...state, userInfo: action.payload };

    case "USER_SIGNOUT":
      // Handle user sign-out
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: "",
        },
      };

    case "SAVE_SHIPPING_ADDRESS":
      // Save the shipping address
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };

    case "SAVE_PAYMENT_METHOD":
      // Save the selected payment method
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };

    default:
      return state;
  }
}

// Create the StoreProvider component to provide the store context
export function StoreProvider(props) {
  // Use the useReducer hook to manage state with the defined reducer
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  // Provide the state and dispatch functions through the context
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
