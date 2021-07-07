import React from 'react'
import { ReactDOM } from 'react';

function RecipeCard(props) {
    return (
        <div>
            <p>{props.title}</p>
            {props.widget}
            <p>{props.summary}</p>
            <p>{props.time}</p>
            <a href={props.url}>view recipe</a>
        </div>
    )
}
export default RecipeCard
