import React, {useState, useEffect} from 'react'
import { useRouter } from "next/router"

const apiKey = process.env.SPOONACULAR_API;


function Results() {
    const router = useRouter();
    const queries = router.query;
    const [data, setData] = useState([]);
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
        if (queries.minCalories != ""){
            params += "&minCalories=";
            params += queries.minCalories; 
        }
        if (queries.maxCalories != ""){
            params += "&maxCalories=";
            params += queries.maxCalories;
        }
        // temp recipe ids array so that wont continuously fetch api 
        var recipeIds = [643150, 649280, 607953, 73449, 659081, 651979, 157960, 634554, 665524,660843]
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
        /** DONT DELETE */

        /** DONT DELETE TESTING WIDGET API 
        let promisesWidget = [];
        recipeIds.map((id) => {
            promisesWidget.push(fetch(`https://api.spoonacular.com/recipes/${id}/tasteWidget?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API}`));
        })
        var widgets = await Promise.all(promisesWidget)
        .then(async(responses) => {
            var dataArr = [];
            for (let res of responses){
                dataArr.push(await res.json());
            }
            return dataArr
        }).then(data => {
            return data;
        });
        console.log(widgets);
        DONT DELETE */
    }

    /** For each recipe returned we need 
     * Recipe ID --> GET https://api.spoonacular.com/recipes/complexSearch
     * Title --> GET https://api.spoonacular.com/recipes/{id}/information (title)
     * Flavor widget --> GET https://api.spoonacular.com/recipes/{id}/tasteWidget 
     * Summary of Recipe --> GET https://api.spoonacular.com/recipes/{id}/information (summary)
     * Time it takes ---> GET https://api.spoonacular.com/recipes/{id}/information (readyInMinutes)
     * URL to recipe ---> GET https://api.spoonacular.com/recipes/{id}/information (sourceURL)
     * */ 
    
    return (
        <div>
            Results Page 
        </div>
    )
}

export default Results
