import React from 'react'
import { ReactDOM } from 'react';
// import { Radar } from 'react-chartjs-2';
import {Line} from "react-chartjs-2" 
import {Radar} from "react-chartjs-2";

function RecipeCard(props) {
    return (
        <div>
            <p>{props.title}</p>
            <p>{props.summary}</p>
            <p>{props.time}</p>
            <a href={props.url}>view recipe</a>
        </div>
    )
}
export default RecipeCard
