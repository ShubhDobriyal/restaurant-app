import { useContext, useEffect, useState } from "react";
import CartContext from "../../../store/cart-context";
import CartIcon from "./../../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCxt = useContext(CartContext);
  const [isBtnAnimated, setIsBtnAnimated] = useState(false);
  const { items } = cartCxt;

  const itemsCount = items.reduce((currentCount, item) => {
    return (currentCount += item.amount);
  }, 0);

  const cartButtonHandler = (e) => {
    props.onClick();
  };

  const btnClasses = `${classes.button} ${isBtnAnimated ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) return;
    setIsBtnAnimated(true);
    const btnAnimateTimer = setTimeout(() => {
      setIsBtnAnimated(false);
    }, 300);

    return () => {
      clearTimeout(btnAnimateTimer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={cartButtonHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{itemsCount}</span>
    </button>
  );
};

export default HeaderCartButton;
