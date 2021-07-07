import React, {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import RecipeCard from '../components/recipeCard';

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
        // var recipeIds = [643150]

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
        // var widgets = await Promise.all(promisesWidget)
        // .then(async(responses) => {
        //     var widgetArr = [];
        //     for (let res of responses){
        //         widgetArr.push(await res.text());
        //     }
        //     return widgetArr
        // }).then(widgetArr => {
        //     var htmlArr = [];
        //     var parser = new DOMParser();
        //     for (let widget of widgetArr){
        //         var doc = parser.parseFromString(widget, "text/html");
        //         htmlArr.push(doc);
        //         console.log(doc)
        //     }
        //     return htmlArr;
        // });
        // console.log(widgets[0]);

        // DUMMY DATA 
        var entries = [];
        let obj = {
            "id": 643150,
            "title": "Fluffy frittata with spinach",
            "url": "http://www.foodista.com/recipe/Z3SVPNCV/fluffy-frittata-with-spinach",
            "time": 45,
            "summary": <><p>Fluffy frittata with spinach might be just the main course you are searching for. This gluten free, primal, and ketogenic recipe serves 4 and costs <b>$1.55 per serving</b>. One serving contains <b>279 calories</b>, <b>20g of protein</b>, and <b>20g of fat</b>. A mixture of spinach, olive oil, spinach, and a handful of other ingredients are all it takes to make this recipe so tasty. 
                            To use up the eggs you could follow this main course with the <a href="https://spoonacular.com/recipes/rose-levy-beranbaums-chocolate-tomato-cake-with-mystery-ganache-27408">Rose Levy Beranbaum's Chocolate Tomato Cake with Mystery Ganache</a> as a dessert. Only a few people made this recipe, and 7 would say it hit the spot. From preparation to the plate, this recipe takes roughly 
                            <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 74%</b>. This score is pretty good. Try <a href="https://spoonacular.com/recipes/fluffy-bacon-cheese-frittata-147451">Fluffy Bacon-Cheese Frittata</a>, <a href="https://spoonacular.com/recipes/fluffy-gluten-free-spinach-cheese-biscuits-682018">Fluffy Gluten Free Spinach Cheese Biscuits</a>, 
                            and <a href="https://spoonacular.com/recipes/fluffy-light-yummy-spinach-blue-cheese-souffle-427654">Fluffy, Light & Yummy: Spinach & Blue Cheese Souffle</a> for similar recipes</p></>,
            "widget": <> 
                        <div>
                            <canvas id="taste-visualization"></canvas>
                        </div>
                        <script dangerouslySetInnerHTML={{__html: `var config={type:"radar",data:{labels:["Sweet","Salty","Sour","Bitter","Savory","Fatty"],datasets:[{label:"",backgroundColor:"rgb(75, 192, 192, 0.2)",borderColor:"rgb(75, 192, 192)",pointBackgroundColor:"rgb(75, 192, 192)",data:[31.46,100,23.52,10.93,43.37,80.91]}]},options:{legend:{display:!1},title:{display:!1},scale:{pointLabels:{fontSize:20},angleLines:{display:!0},ticks:{display:!1,min:0,max:100,stepSize:20}}}};new Chart(document.getElementById("taste-visualization"),config);`}}>
                        </script>
                    </> // only using widget in this way for dummy data, later widget will be in its own seperate array 
        }
        for (let i = 0; i < 6; ++i){
            entries.push(obj);
        }
        setInfo(entries);
        setNumResults(entries.length);
    }
    
    return (
        <div>
            <h1>Here are the results with your constraints</h1>
            <p>We found {numResults} recipes for you</p>
            {info.map((entry, index) => 
                <RecipeCard 
                    key={index} // change to id here when it becomes unique
                    title={entry.title}
                    url={entry.url}
                    time={entry.time}
                    summary={entry.summary}
                    widget={entry.widget}
                />
            )}
        </div>
    )
}

export default Results
