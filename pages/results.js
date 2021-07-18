import React, {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import RecipeCard from '../components/recipeCard';
import styles from "../styles/results.module.css";
import Navbar from "react-bootstrap/NavBar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import logofinal from "../public/images/logofinal.svg";


const apiKey = process.env.SPOONACULAR_API;

/** For each recipe returned we need 
 * Recipe ID --> GET https://api.spoonacular.com/recipes/complexSearch
 * Title --> GET https://api.spoonacular.com/recipes/{id}/information (title)
 * Flavor widget --> GET https://api.spoonacular.com/recipes/{id}/tasteWidget 
 * Summary of Recipe --> GET https://api.spoonacular.com/recipes/{id}/information (summary)
 * Time it takes ---> GET https://api.spoonacular.com/recipes/{id}/information (readyInMinutes)
 * URL to recipe ---> GET https://api.spoonacular.com/recipes/{id}/information (sourceURL)
 * */ 

function Results() {
    const router = useRouter();
    const queries = router.query;
    const [info, setInfo] = useState([]);
    const [widgets, setWidgets] = useState([]); 
    const [numResults, setNumResults] = useState(0);

    useEffect(() =>{
        loadData(queries);
    }, []) // run only once 

    async function loadData(queries){
        var params = "";
        var recipes = [];
        if (queries.ingredients != undefined){
            params += "&ingredients=";
            params += Array.isArray(queries.ingredients) ? queries.ingredients.join() : queries.ingredients;
        }
        if (queries.ingredientsRemove != undefined){
            params += "&excludeIngredients=";
            params += Array.isArray(queries.ingredientsRemove) ? queries.ingredientsRemove.join() : queries.ingredientsRemove;
        }
        if (queries.equipment != undefined){
            params += "&equipment=";
            params += Array.isArray(queries.equipment.length) ? queries.equipment.join() : queries.equipment;
        }
        if (queries.cuisine != undefined){
            params += "&cuisine=";
            params += Array.isArray(queries.cuisine.length) ? queries.cuisine.join() : queries.cuisine;
        }
        if (queries.diet != ""){
            params += "&diet=";
            params += queries.diet;
        }
        if (queries.maxReadyTime != ""){
            params += "&maxReadyTime";
            params += queries.maxReadyTime;
        }
        if (queries.minCalories != ""){
            params += "&minCalories=";
            params += queries.minCalories; 
        }
        if (queries.maxCalories != ""){
            params += "&maxCalories=";
            params += queries.maxCalories;
        }
        // *DELETE LATER temp recipe ids array so that wont continuously fetch api 
        // var recipeIds = [643150, 649280, 607953, 73449, 659081, 651979, 157960, 634554, 665524, 660843]
        var recipeIds = [643150, 649280]

        /** DONT DELETE grabs recipe ID's */
        // var recipeIds = [];
        // recipeIds = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API}` + params)
        // .then(response => response.json())
        // .then(data => {
        //     data.map((recipe) => {
        //         recipeIds.push(recipe.id);
        //     })
        //     return recipeIds;
        // });
        // console.log(recipeIds);
        /** DONT DELETE */

        /** DONT DELETE grabs info */
        // let promisesInfo = [];
        // recipeIds.map((id) => {
        //     promisesInfo.push(fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API}&includeNutrition=false`));
        // })
        // var info = await Promise.all(promisesInfo)
        // .then(async (responses) => {
        //     var dataArr = [];
        //     for (let res of responses){
        //         dataArr.push(await res.json());
        //     }
        //     return dataArr; 
        // }).then(data => {
        //     return data;
        // });
        // var entries = [];
        // for (let entry of info){
        //     let obj = {
        //         "id": entry.id,
        //         "title": entry.title,
        //         "url": entry.sourceUrl,
        //         "time": entry.readyInMinutes,
        //         "summary": entry.summary
        //     }; 
        //     entries.push(obj);
        // }
        // setInfo(entries);
        
        /** DONT DELETE */

        /* DONT DELETE FETCHES WIDGET API */ 
        // let promisesWidget = [];
        // recipeIds.map((id) => {
        //     promisesWidget.push(fetch(`https://api.spoonacular.com/recipes/${id}/tasteWidget?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API}`));
        // })
        // var dataArr = await Promise.all(promisesWidget)
        // .then(async(responses) => {
        //     var widgetArr = [];
        //     for (let res of responses){
        //         widgetArr.push(await res.text());
        //     }
        //     return widgetArr
        // }).then(widgetArr => {
        //     let dataArr = [];
        //     for (let widget of widgetArr){
        //         let arr = []
        //         let startIdx = 305; // taking advantage of the fact that all responses are the same except for the datapoints
        //         let endIdx = widget.indexOf("]", startIdx)-1; // exclude the bracket
        //         let dataArrStr = widget.substr(startIdx, endIdx-startIdx).split(',');
        //         for (const datapoint of dataArrStr){
        //             arr.push(parseFloat(datapoint))
        //         }
        //         dataArr.push(arr);
        //     }
        //     return dataArr;
        // });
        // console.log(dataArr[0]);
        // console.log(dataArr[1]);

        // DUMMY DATA 
        var entries = [];
        let obj = {
            "id": 643150,
            "title": "Fluffy frittata with spinach",
            "url": "http://www.foodista.com/recipe/Z3SVPNCV/fluffy-frittata-with-spinach",
            "time": 45,
            "summary": <>Fluffy frittata with spinach might be just the main course you are searching for. This gluten free, primal, and ketogenic recipe serves 4 and costs <b>$1.55 per serving</b>. One serving contains <b>279 calories</b>, <b>20g of protein</b>, and <b>20g of fat</b>. A mixture of spinach, olive oil, spinach, and a handful of other ingredients are all it takes to make this recipe so tasty. 
                            To use up the eggs you could follow this main course with the <a href="https://spoonacular.com/recipes/rose-levy-beranbaums-chocolate-tomato-cake-with-mystery-ganache-27408">Rose Levy Beranbaum's Chocolate Tomato Cake with Mystery Ganache</a> as a dessert. Only a few people made this recipe, and 7 would say it hit the spot. From preparation to the plate, this recipe takes roughly 
                            <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 74%</b>. This score is pretty good. Try <a href="https://spoonacular.com/recipes/fluffy-bacon-cheese-frittata-147451">Fluffy Bacon-Cheese Frittata</a>, <a href="https://spoonacular.com/recipes/fluffy-gluten-free-spinach-cheese-biscuits-682018">Fluffy Gluten Free Spinach Cheese Biscuits</a>, 
                            and <a href="https://spoonacular.com/recipes/fluffy-light-yummy-spinach-blue-cheese-souffle-427654">Fluffy, Light & Yummy: Spinach & Blue Cheese Souffle</a> for similar recipes</>,
            "shortSummary": <>Fluffy frittata with spinach might be just the main course you are searching for.</>
        }
        for (let i = 0; i < 6; ++i){
            entries.push(obj);
        }
        setInfo(entries);
        setNumResults(entries.length);
    }

    
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light static-top" style={{border: "2px solid #332F30", backgroundColor: "white !important", height: "100px", padding: "0"}}>
            {/* <div className="container" style={{marginLeft: 0}}> */}
                <a className="navbar-brand" style={{marginLeft: "14px"}}href="#">
                    <Image src={logofinal} alt="" width="70px" height="64px" top="20px"/>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse" id="navbarResponsive" style={{justifyContent:"flex-end", height: "100%"}}>
                    <ul className="navbar-nav ml-auto" style={{height: "100%", display: "flex", justifyContent:"center", alignItems:"center"}}>
                        <li className="nav-item active" style={{padding: "22px", border:"2px solid #332F30", borderBottom: "0", width: "250px"}}>
                            <a className="nav-link" style={{fontSize:"26px", fontFamily:"Le Havre Rounded Regular", color: "#332F30", textAlign:"center"}} href="#">about us</a>
                        </li>
                        <li className="nav-item" style={{padding: "22px", backgroundColor: "#332F30", width: "250px"}}>
                            <a className="nav-link" style={{fontSize:"26px", fontFamily:"Le Havre Rounded Regular", color:"white", textAlign:"center"}} href="#">back to home</a>
                        </li>
                    </ul>
                </div>
            {/* </div> */}
        </nav>
        <div styles={styles.mainContainer}>
            <div>
                <h1 className={styles.firstHeading}>Here are the results with your constraints</h1>
                <p className={styles.numberResults}>We found {numResults} recipes for you</p>
                <div className={`.row align-items-start ${styles.resultsContainer}`}>
                    {info.map((entry, index) => 
                        <RecipeCard 
                            key={index} // change to id here when it becomes unique
                            title={entry.title}
                            url={entry.url}
                            time={entry.time}
                            summary={entry.summary}
                            shortSummary={entry.shortSummary}
                        />
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default Results
