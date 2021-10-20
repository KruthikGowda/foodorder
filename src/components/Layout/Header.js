import React from "react";
import Coverimage from "../../assets/images/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

export default function Header(props) {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>HungryMeals</h1>
        <HeaderCartButton onClick={props.onshowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={Coverimage} alt="CoverImage" />
      </div>
    </React.Fragment>
  );
}
