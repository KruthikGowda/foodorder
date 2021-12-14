import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

export default function AvailableMeals() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/data")
      .then((response) => response.json())
      .then((resJson) => {
        setProducts(resJson.data);
        console.log(resJson.data);
      });
  }, []);

  const mealslist = products.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealslist}</ul>
      </Card>
    </section>
  );
}
