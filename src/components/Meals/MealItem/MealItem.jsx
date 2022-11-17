import { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

import CartContext from "../../../store/cart-context";
import Card from "../../UI/Card/Card";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);

  const addToCartHandler = (itemCount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: itemCount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <Card>
        <div>
          <img className={classes.mealImg} src={props.img} alt="" />
          <div className={classes.mealContent}>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{price}</div>
          </div>
        </div>
        <div className={classes.mealFooter}>
          <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
        </div>
      </Card>
    </li>
  );
};

export default MealItem;
