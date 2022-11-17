import React from "react";
import headerBg from "./../../../assets/header.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
import Logo from "./Logo";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>
          <Logo className="logo" />
          Estimat
        </h1>
        <HeaderCartButton onClick={props.onToggleCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={headerBg} alt="" />
      </div>
    </React.Fragment>
  );
};

export default Header;
