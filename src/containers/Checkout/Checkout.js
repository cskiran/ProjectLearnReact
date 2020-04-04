import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/Checkoutsummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          oncheckoutContinued={this.checkoutContinuedHandler}
        ></CheckoutSummary>
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        ></Route>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  };
};
export default connect(mapStateToProps)(Checkout);
