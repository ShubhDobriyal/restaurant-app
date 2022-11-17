import { useState } from "react";
import Input from "../../UI/Input/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [isAmountValid, setIsAmountValid] = useState(true);
  // const amountInputRef = useRef();
  const [enteredAmount, setEnteredAmount] = useState(Number("1"));

  const itemCountHandler = (e) => {
    setEnteredAmount(Number(e.target.value.trim()));
  };

  const addItemHandler = (e) => {
    e.preventDefault();

    // const enteredAmount = Number(amountInputRef.current.value.trim());

    if (enteredAmount.length === 0 || enteredAmount < 1) {
      setIsAmountValid(false);
    }

    props.onAddToCart(enteredAmount);
  };

  return (
    <form onSubmit={addItemHandler} className={classes.form}>
      <button
        onClick={() => setEnteredAmount((val) => val - 1)}
        type="button"
        className={classes.controlBtn}
      >
        -
      </button>
      <Input
        label=""
        input={{
          id: "amount_" + props.id,
          type: "text",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
          value: enteredAmount,
        }}
        onItemCountChange={itemCountHandler}
      />
      <button
        onClick={() => setEnteredAmount((val) => val + 1)}
        type="button"
        className={classes.controlBtn}
      >
        +
      </button>
      <button type="submit">+ Add</button>
      {!isAmountValid && <p>Please enter a valid amount</p>}
    </form>
  );
};

export default MealItemForm;
