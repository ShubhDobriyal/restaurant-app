import { useCallback, useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    email: true,
    phone: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const entertedName = nameRef.current.value;
    const entertedEmail = emailRef.current.value;
    const entertedPhone = phoneRef.current.value;
    const entertedStreet = streetRef.current.value;
    const entertedPostal = postalRef.current.value;
    const entertedCity = cityRef.current.value;

    const nameIsValid = !isEmpty(entertedName);
    const emailIsValid = !isEmpty(entertedEmail) && entertedEmail.includes("@");
    const phoneIsValid = !isEmpty(entertedPhone);
    const streetIsValid = !isEmpty(entertedStreet);
    const postalIsValid =
      !isEmpty(entertedPostal) && isSixChars(entertedPostal);
    const cityIsValid = !isEmpty(entertedCity);

    setFormValidity({
      name: nameIsValid,
      email: emailIsValid,
      phone: phoneIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid &&
      emailIsValid &&
      phoneIsValid &&
      streetIsValid &&
      postalIsValid &&
      cityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: entertedName,
      email: entertedEmail,
      phone: entertedPhone,
      street: entertedStreet,
      postal: entertedPostal,
      city: entertedCity,
    });
  };

  const nameInputClasses = `${classes.control} ${
    formValidity.name ? "" : classes.invalid
  }`;
  const phoneInputClasses = `${classes.control} ${
    formValidity.email ? "" : classes.invalid
  }`;
  const emailInputClasses = `${classes.control} ${
    formValidity.phone ? "" : classes.invalid
  }`;
  const streetInputClasses = `${classes.control} ${
    formValidity.street ? "" : classes.invalid
  }`;
  const postalInputClasses = `${classes.control} ${
    formValidity.postal ? "" : classes.invalid
  }`;
  const cityInputClasses = `${classes.control} ${
    formValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.formInputs}>
        <div className={nameInputClasses}>
          <label htmlFor="name">Name</label>
          <input ref={nameRef} type="text" id="name" />
          {!formValidity.name && (
            <p className={classes.error}>Please enter a valid name</p>
          )}
        </div>
        <div className={emailInputClasses}>
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="email" id="email" />
          {!formValidity.email && (
            <p className={classes.error}>Please enter a valid email</p>
          )}
        </div>
        <div className={phoneInputClasses}>
          <label htmlFor="name">Phone</label>
          <input ref={phoneRef} type="text" id="phone" />
          {!formValidity.phone && (
            <p className={classes.error}>Please enter a valid phone</p>
          )}
        </div>
        <div className={streetInputClasses}>
          <label htmlFor="street">Street</label>
          <input ref={streetRef} type="text" id="street" />
          {!formValidity.street && (
            <p className={classes.error}>Please enter a valid street name</p>
          )}
        </div>
        <div className={postalInputClasses}>
          <label htmlFor="postal">Postal Code</label>
          <input ref={postalRef} type="text" id="postal" />
          {!formValidity.postal && (
            <p className={classes.error}>Please enter a valid postal code</p>
          )}
        </div>
        <div className={cityInputClasses}>
          <label htmlFor="city">City</label>
          <input ref={cityRef} type="text" id="city" />
          {!formValidity.city && (
            <p className={classes.error}>Please enter a valid city name</p>
          )}
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Go back
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
