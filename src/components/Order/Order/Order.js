import React from 'react';
import classes from './Order.module.css'
const order = (props) =>{ 
    const ingredients = [];
    for(let ingredienName in props.ingredients ) {
        ingredients.push({name: ingredienName ,amount: props.ingredients[ingredienName]})
    }
    const ingredout = ingredients.map(ig =>{
    return <span>{ig.name} ({ig.amount})</span>
    })
    return (
    <div className={classes.Order}>
        <p>Ingredients: {ingredout}</p>
        <p>Price: <strong>USD {props.price}</strong></p>
    </div>
);
}

export default order;