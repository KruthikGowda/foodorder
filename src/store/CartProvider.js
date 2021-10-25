import React, { useContext, useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  return defaultCartState;
};

const defaultCartState = {
  item: [],
  totalAmount: 0,
};

export default function CartProvider(props) {
  useReducer(cartReducer, defaultCartState);

  const addItems = (item) => {};

  const removeItems = (id) => {};

  const cartContext = {
    items: [],
    totalAmount: 0,
    addItem: addItems,
    removeItem: removeItems,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
