import React, { Component } from "react";
import Aux from "../../HOC/hoc";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandler from "../../HOC/ErrorHandler/ErrorHandler";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: null
  };

  componentDidMount() {
    // axios
    //   .get("https://reactburger-63977.firebaseio.com/ingredients.json")
    //   .then(res => {
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch(err => {
    //     this.setState({ error: err });
    //   });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  //   addIngredientHandler = type => {
  //     const oldCount = this.state.ingredients[type];
  //     const updatedCount = oldCount + 1;
  //     const updatedIngredients = {
  //       ...this.state.ingredients
  //     };
  //     updatedIngredients[type] = updatedCount;
  //     const priceAddtion = INGREDIENT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice + priceAddtion;
  //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //     this.updatePurchaseState(updatedIngredients);
  //   };

  //   removeIngredient = type => {
  //     const oldCount = this.state.ingredients[type];
  //     if (oldCount <= 0) {
  //       return;
  //     }
  //     const updatedCount = oldCount - 1;
  //     const updatedIngredients = {
  //       ...this.state.ingredients
  //     };
  //     updatedIngredients[type] = updatedCount;
  //     const priceAddtion = INGREDIENT_PRICES[type];
  //     const oldPrice = this.state.totalPrice;
  //     const newPrice = oldPrice - priceAddtion;
  //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //     this.updatePurchaseState(updatedIngredients);
  //   };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };
  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    if (this.state.loading) {
      orderSummary = <Spinner></Spinner>;
    }
    let burger = <Spinner></Spinner>;
    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          purchaseCancelled={this.purchaseCancelHandler}
          price={this.props.price}
          purchasecontinued={this.purchaseContinueHandler}
          ingredients={this.props.ings}
        />
      );
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} /> : "asdasd"}
          <BuildControls
            ingredientAdded={this.props.onIngAdded}
            ingredientRemove={this.props.onIngRemove}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          ></BuildControls>
        </Aux>
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngAdded: ingName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngRemove: ingName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler(BurgerBuilder, axios));
