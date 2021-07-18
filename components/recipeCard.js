import styles from '../styles/results.module.css'
import React, {useState, useEffect} from 'react'
import { Radar } from 'react-chartjs-2';
import Image from "next/image";
import starIcon from "../public/images/star.svg";
import "bootstrap/dist/css/bootstrap.min.css";

function RecipeCard(props) {
    const data = {
        labels: ["Sweet","Salty","Sour","Bitter","Savory","Fatty"],
        datasets: [
          {
              label:"",
              backgroundColor:"rgb(75, 192, 192, 0.2)",
              borderColor:"rgb(75, 192, 192)",
              pointBackgroundColor:"rgb(75, 192, 192)",
              data: [20.31,100,43.67,26.8,30.94,53.45],
          },
        ],
    };

    const options = {
        legend:{display: !1},
        title:{display: !1},
        scale:{
            pointLabels: {fontSize:20},
            angleLines:{display:!0},
            ticks:{display:!1,min:0,max:100,stepSize:20}
        },
        plugins:{
            legend: false
        },
    }
    const [isLongSummary, setIsLongSummary] = useState(false);
    


    return (
        <div className={`.col ${styles.recipeCardContainer}`}>
            <p className={styles.recipeTitle}>{props.title}</p>
            <div style={{padding:"0px 30px 30px 30px"}}>
                <Radar 
                    data={data} 
                    options={options}
                />
                {
                    isLongSummary && 
                    <p className={styles.recipeSummary}>{props.summary}</p>
                }{
                    !isLongSummary &&
                    <p className={styles.recipeSummary}>{props.shortSummary}</p>
                }
                <div className={styles.recipeFooter}>
                    <div>
                        <p className={styles.recipeTime}>{props.time} minutes</p>
                        <svg width="35" height="35" viewBox="0 0 927 876" fill="yellow" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d)">
                            <path d="M463.5 0L571.828 331.326H922.385L638.778 536.097L747.106 867.424L463.5 662.653L179.894 867.424L288.222 536.097L4.61523 331.326H355.172L463.5 0Z" fill="white"/>
                            <path d="M463.5 32.1788L562.323 334.434L564.577 341.326H571.828H891.452L632.924 527.99L627.004 532.264L629.273 539.205L728.055 841.334L469.354 654.545L463.5 650.319L457.646 654.545L198.945 841.334L297.727 539.205L299.996 532.264L294.075 527.99L35.5479 341.326H355.172H362.423L364.677 334.434L463.5 32.1788Z" stroke="#707070" stroke-width="20"/>
                            </g>
                            <defs>
                            <filter id="filter0_d" x="0.615234" y="0" width="925.77" height="875.424" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                            </filter>
                            </defs>
                        </svg>
                    </div>
                    <button className={styles.viewRecipeButton}>
                        <a href={props.url}>view recipe</a>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default RecipeCard
