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
        var recipeIds = [];
        recipeIds = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API}` + params)
        .then(response => response.json())
        .then(data => {
            data.map((recipe) => {
                recipeIds.push(recipe.id);
            })
            return recipeIds;
        });
        console.log(recipeIds);

        let promisesInfo = [];
        recipeIds.map((id) => {
            promisesInfo.push(fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API}&includeNutrition=false`));
        })
        var info = await Promise.all(promisesInfo)
        .then(async (responses) => {
            var dataArr = [];
            for (let res of responses){
                dataArr.push(await res.json());
            }
            return dataArr; 
        }).then(data => {
            return data;
        });

        console.log(info);

        // let promisesWidget = [];
        // recipeIds.map((id) => {
        //     promisesWidget.push(`https://api.spoonacular.com/recipes/${id}/tasteWidget?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API}`)
        // })
        // var widgets = Promise.all(promisesWidgets)
        // .then((responses) => {
        //     var dataArr = [];
        //     for (let res of responses){
        //         res.json().then(data => dataArr.push(data));
        //     }
        //     return dataArr; 
        // });
        // console.log(widgets);

        

    }

    // async function getInfo(recipeIds) {
    //     recipeIds.map((id) => {
    //         await fetch(`https://api.spoonacular.com/recipes/${id}/information`)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //         });
    //     })
    // }

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
