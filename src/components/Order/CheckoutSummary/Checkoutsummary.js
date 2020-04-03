import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./Checkoutsummary.module.css";
const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>we hope you enjoy it</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients}></Burger>
      </div>
      <Button btnType="Danger" clicked={props.onCheckoutCancelled}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.oncheckoutContinued}>
        Continue
      </Button>
    </div>
  );
};

export default checkoutSummary;
