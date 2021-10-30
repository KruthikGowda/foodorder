import React, { useReducer } from "react";
import CartContext from "./cart-context";

const cartReducer = (state, action) => {
  if (action.type === "ADD_CART_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItems = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItems) {
      const updatedItem = {
        ...existingCartItems,
        amount: existingCartItems.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE_CART_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItems = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItems.price;
    let updatedItems;
    if (existingCartItems.amount === 1) {
      updatedItems = state.items.filter((items) => items.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItems,
        amount: existingCartItems.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

export default function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItems = (item) => {
    dispatchCartAction({ type: "ADD_CART_ITEM", item: item });
  };

  const removeItems = (id) => {
    dispatchCartAction({ type: "REMOVE_CART_ITEM", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItems,
    removeItem: removeItems,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
