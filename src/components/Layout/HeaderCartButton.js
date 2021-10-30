import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

export default function HeaderCartButton(props) {
  const [btnIsBump, setBtnIsBump] = useState(false);
  const cartCtx = useContext(CartContext);

  const nOCT = cartCtx.items.reduce((curNo, item) => {
    return curNo + item.amount;
  }, 0);

  const { items } = cartCtx;

  const btnClasses = `${classes.button} ${btnIsBump ? classes.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsBump(true);

    const timer = setTimeout(() => {
      setBtnIsBump(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{nOCT}</span>
    </button>
  );
}
