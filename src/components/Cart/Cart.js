import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

export default function Cart(props) {
  const cartCtx = useContext(CartContext);

  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemove = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAdd = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((items) => (
        <CartItem
          key={items.id}
          name={items.name}
          amount={items.amount}
          price={items.price}
          onAdd={cartItemAdd.bind(null, items)}
          onRemove={cartItemRemove.bind(null, items.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onhideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onhideCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
}
