import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let transformedIngredients ;
    if (props.ingredients) {
         transformedIngredients = Object.keys(props.ingredients)
            .map(ing => {
                return [...Array(props.ingredients[ing])].map((_, i) => {
                    return <BurgerIngredient key={ing + i} type={ing} />;
                });
            }).reduce((arr,el) => {
                return arr.concat(el);
            });
      if(transformedIngredients.length === 0) {
          transformedIngredients = <p>Please start adding ingredients</p>
      }      
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;