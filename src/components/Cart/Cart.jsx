import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckOut, setCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            price={item.price}
            name={item.name}
            amount={item.amount}
            onCartItemRemove={cartItemRemoveHandler.bind(null, item.id)}
            onCartItemAdd={cartItemAddHandler.bind(null, item)}
          ></CartItem>
        );
      })}
    </ul>
  );

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const closeModalHandler = (e) => {
    props.onToggleCart();
  };

  const checkoutHandler = () => {
    setCheckout((previousState) => !previousState);
  };

  const ModalActions = (
    <div className={classes.actions}>
      <button onClick={closeModalHandler} className={classes["button--alt"]}>
        Close
      </button>
      <button onClick={checkoutHandler} className={classes.button}>
        Order
      </button>
    </div>
  );

  const orderSubmitHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://udemy-2-d6288-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setIsSubmitted(true);
    cartCtx.clearCart();
  };

  const isSubmittingContent = <p>Sending your order...</p>;

  const isSubmittedContent = (
    <>
      <p>Restaurant has received your order, will be delivered soon!</p>
      <div className={classes.actions}>
        <button onClick={closeModalHandler} className={classes.button}>
          Close
        </button>
      </div>
    </>
  );

  const cartContent = (
    <>
      {!isCheckOut && (
        <>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
        </>
      )}
      {isCheckOut && (
        <Checkout onConfirm={orderSubmitHandler} onCancel={checkoutHandler} />
      )}
      {!isCheckOut && ModalActions}
    </>
  );

  return (
    <Modal onClick={props.onToggleCart}>
      {!isSubmitting && !isSubmitted && cartContent}
      {isSubmitting && isSubmittingContent}
      {isSubmitted && !isSubmitting && isSubmittedContent}
    </Modal>
  );
};

export default Cart;
