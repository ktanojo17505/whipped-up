import styles from '../styles/results.module.css'
import React, {useState, useEffect} from 'react'
import { Radar } from 'react-chartjs-2';
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
                    <p className={styles.recipeTime} stye={{margin: '0'}}>{props.time} minutes</p>
                    <button className={styles.viewRecipeButton}>
                        <a href={props.url}>view recipe</a>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default RecipeCard
