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
            // console.log(recipeIds);
            return recipeIds;
        });
        console.log(recipeIds);
        // const recipeIds = await getIds();
    
        // console.log(recipeIds);

        // recipeIds.map((id) => console.log(id))
        // console.log(recipeIds);
        // fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API}` + params)
        // .then(response => response.json())
        // .then(data => 
        //     data.map((recipe) => {
        //         recipeIds.push(recipe.id);
        //         console.log(recipe.id)
        //     })
        // )

    }

    // async function getIds(params) {
    //     var recipeIds = [];
    //     fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API}` + params)
    //     .then(response => response.json())
    //     .then(data => {
    //         data.map((recipe) => {
    //             recipeIds.push(recipe.id);
    //         })
    //         return recipeIds;
    //         }   
    //     )
    // }

    const getInfo = async(id) => {
        console.log(id);
        fetch(`https://api.spoonacular.com/recipes/${id}/information`)
        .then(response => response.json())
        .then(data => console.log(data));
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
