import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.input}>
      <input onChange={(e) => props.onItemCountChange(e)} {...props.input} />
    </div>
  );
};

export default Input;
