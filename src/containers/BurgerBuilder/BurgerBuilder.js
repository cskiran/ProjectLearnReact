import React, { Component } from "react";
import Aux from '../../HOC/hoc';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import errorHandler from '../../HOC/ErrorHandler/ErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        purchasable: false,
        totalPrice: 4,
        purchasing: false,
        loading: false,
        error: null
    };

    componentDidMount() {
        axios.get('https://reactburger-63977.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data})
            }).catch(err=>{
                this.setState({error: err});
            })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el)=>{
            return sum + el;
        },0);
        this.setState({purchasable: sum>0});
    }

    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddtion = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddtion;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredient= (type)=> {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddtion = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddtion;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = ()=> {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = ()=>{
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = ()=>{
        // alert('you continue');
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer : {
                name : 'kiran',
                address: {
                    street: 'TestStreet 1',
                    zipCode: '41351',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliverMethode: 'fastes'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false,purchasing: false})
            });
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        if(this.state.loading) {
            orderSummary = <Spinner></Spinner>
        }
        let burger = <Spinner></Spinner>
        if(this.state.ingredients) {
             orderSummary = <OrderSummary 
                        purchaseCancelled={this.purchaseCancelHandler}
                        price={this.state.totalPrice}
                        purchasecontinued={this.purchaseContinueHandler}
                        ingredients={this.state.ingredients}/>;
            burger = 
            <Aux>
                <Burger ingredients={this.state.ingredients}/> : "asdasd"}
                <BuildControls 
                ingredientAdded={this.addIngredientHandler}
                ingredientRemove={this.removeIngredient}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchaseHandler}></BuildControls>
            </Aux>;
        }
         
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default errorHandler(BurgerBuilder, axios);