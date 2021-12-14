import React, { useContext, useEffect, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export default function Cart(props) {
  const cartCtx = useContext(CartContext);

  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const [totAmount, setTotAmount] = useState();
  useEffect(() => {
    setTotAmount(cartCtx.totalAmount);

    // localStorage.setItem("data", JSON.stringify(totAmount));
  }, [cartCtx.totalAmount, totAmount]);

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

  async function displayRazorpay() {
    props.onhideCart();
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Contact Developer!");
      return;
    }

    const data = await fetch("http://localhost:3001/razorpay", {
      method: "POST",
    }).then((t) => t.json());

    const options = {
      key: process.env.Razorpay, //Key ID generated from the Dashboard
      amount: data.amount.toString(),
      currency: data.currency,
      name: "Food App",
      description: "Thank you for odering with us!.HungryMeals",
      image: "http://localhost:3001/logo",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#8a2b06",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

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
        {hasItems && (
          <button className={classes.button} onClick={displayRazorpay}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
}
