import styles from '../styles/results.module.css'
import React, {useState, useEffect} from 'react'
import { Radar } from 'react-chartjs-2';
import "bootstrap/dist/css/bootstrap.min.css";

function RecipeCard(props) {
    const [radarData, setRadarData] = useState(null);

    useEffect(() => {
        console.log(props.widgetData)
        const data = {
            labels: ["Sweet","Salty","Sour","Bitter","Savory","Fatty"],
            datasets: [
              {
                  label:"",
                  backgroundColor:"rgb(75, 192, 192, 0.2)",
                  borderColor:"rgb(75, 192, 192)",
                  pointBackgroundColor:"rgb(75, 192, 192)",
                  data: props.widgetData,
              },
            ],
        };
        setRadarData(data);
    }, [props])

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

    return (
        <div className={`.col ${styles.recipeCardContainer}`}>
            <p className={styles.recipeTitle}>{props.title}</p>
            <div style={{padding:"0px 30px 30px 30px"}}>
                <Radar 
                    data={radarData} 
                    options={options}
                />
                <p className={styles.recipeSummary}>{props.summary}</p>
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
