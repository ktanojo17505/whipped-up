import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import searchIcon from "../public/images/searchicon.svg";
import Image from "next/image"
import styles from "../styles/form.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Item from "../components/item.js";
import InputSearchBar from "../components/inputSearchBar";
import mCustomScrollbar from "malihu-custom-scrollbar-plugin";
import Checkbox from "../components/checkbox.js";


class FormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            ingredients: [],
            ingredientsRemove: [],
            equipment: [],
            cuisines: [],
            dietaryRestriction: [
                {
                    diet: "vegetarian",
                    isChecked: false,
                },
                {
                    diet: "vegan",
                    isChecked: false,
                },
                {
                    diet: "whole30",
                    isChecked: false,
                },
                {
                    diet: "gluten free",
                    isChecked: false,
                },
                {
                    diet: "ketogenic",
                    isChecked: false,
                },
                {
                    diet: "lacto-vegetarian",
                    isChecked: false,
                }, 
                {
                    diet: "ovo-vegetarian",
                    isChecked: false,
                },
                {
                    diet: "pescetarian",
                    isChecked: false,
                },
                {
                    diet: "paleo",
                    isChecked: false,
                }, 
                {
                    diet: "primal",
                    isChecked: false,
                }
            ],
            minTime: -1,
            maxTime: -1,
            minCalories: -1,
            maxCalories: -1,
        }
        this.handleIngredientSubmit = this.handleIngredientSubmit.bind(this);
        this.handleIngredientRemove = this.handleIngredientRemove.bind(this);
        this.handleNextForm = this.handleNextForm.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    handleIngredientSubmit(e, stateKey) {
        if (e.key == "Enter"){
            var ingredientsArray = this.state[stateKey]; 
            ingredientsArray.push(e.target.value); 
            this.setState({[stateKey]: ingredientsArray});
            e.target.value = "";
        }
    }

    handleIngredientRemove(input, stateKey){
        console.log(input);
        var arr = this.state[stateKey]; 
        var index = arr.indexOf(input);
        arr.splice( index, 1 );
        this.setState({[stateKey] : arr});
    }

    handleNextForm(){
        var nextStep = this.state.step + 1; 
        this.setState({step: nextStep});
    }

    handleCheck(diet){
        // console.log("in handle check")
        var dietArr = this.state.dietaryRestriction; 
        dietArr.find((obj) => {
            if (obj.diet == diet){
                obj.isChecked = !obj.isChecked;
            } 
        });
        this.setState({dietaryRestriction: dietArr})
    }

    render() { 
        // const headers = [
        //     "First, let's settle the ingredients.",
        //     "Next, the equipment and diet.",
        //     "Finally, time, cuisine, and taste profile."
        // ];
        const ingredientArr = this.state.ingredients;
        const ingredientRemArr = this.state.ingredientsRemove;
        const equipmentArr = this.state.equipment; 
        const cuisinesArr = this.state.cuisines; 
        const dietMap = this.state.dietaryRestriction; 
        // dietMap.map((diet, index) => console.log(diet));
        const step = this.state.step; 
        return ( 
            <div className={styles.outerContainer}>
                <div className={styles.wave}>
                    <div className={styles.wave2}>
                    </div>
                </div>
                <div className={`col align-items-start ${styles.rightBlock}`}>
                    <div className={`col-3 ${styles.tabGroup}`}>
                        <div className={styles.tab}>
                        ingredients
                        </div>
                        <div className={styles.tab}>equipment & diet</div>
                        <div className={styles.tab}>extras</div>
                    </div>
                    <div className={`.col-sm-9 ${styles.outerForm}`}>
                        {step == 0 && 
                        <>
                            <div className={styles.addItems}>
                                <InputSearchBar 
                                    label={"Your leftover Ingredients are"}
                                    name={"ingredients"}
                                    handleIngredientSubmit={this.handleIngredientSubmit}
                                />
                                <div className={`.overflow-auto ${styles.items}`}> 
                                    {ingredientArr.map((ingredient, index) => 
                                        <Item 
                                        key={index}
                                        name={ingredient}
                                        addIngredient={true}
                                        stateVar={"ingredients"}
                                        handleIngredientRemove={this.handleIngredientRemove}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className={styles.deleteItems}>
                                <InputSearchBar 
                                    label={"Ingredients to remove from all recipes"}
                                    name={"ingredientsRemove"}
                                    handleIngredientSubmit={this.handleIngredientSubmit}
                                />
                                <div className={styles.items}>
                                    {ingredientRemArr.map((ingredient, index) => 
                                        <Item 
                                        key={index}
                                        name={ingredient}
                                        addIngredient={false}
                                        stateVar={"ingredientsRemove"}
                                        handleIngredientRemove={this.handleIngredientRemove}
                                        />
                                    )}
                                </div>
                            </div>
                            <Button className={styles.nextButton} variant="dark" onClick={this.handleNextForm}>next</Button>
                        </>
                        }
                        {step == 1 && 
                            <>
                                <div className={styles.addItems}>
                                    <InputSearchBar 
                                        label={"The equipment you own is"}
                                        name={"equipment"}
                                        handleIngredientSubmit={this.handleIngredientSubmit}
                                    />
                                    <div className={`.overflow-auto ${styles.items}`}> 
                                        {equipmentArr.map((equipment, index) => 
                                            <Item 
                                            key={index}
                                            name={equipment}
                                            addIngredient={true}
                                            stateVar={"equipment"}
                                            handleIngredientRemove={this.handleIngredientRemove}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className={styles.deleteItems}>
                                    <h1 className={styles.title}>Your dietary restriction is currently for</h1>
                                    <div className={`.overflow-auto ${styles.items}`}>
                                        {dietMap.map((dietaryRestriction, index) => 
                                            <Checkbox 
                                            isChecked={dietaryRestriction.isChecked}
                                            diet={dietaryRestriction.diet}
                                            handleCheck={this.handleCheck}
                                            />
                                        )};
                                    </div>
                                </div>
                                <Button className={styles.nextButton} variant="dark" onClick={this.handleNextForm}>next</Button>
                            </>
                        }
                        {step == 2 && 
                            <>
                            <div className={styles.deleteItems}>
                                <InputSearchBar 
                                    label={"The cuisines you're interested in"}
                                    name={"cuisines"}
                                    handleIngredientSubmit={this.handleIngredientSubmit}
                                />
                                <div className={styles.items}>
                                    {cuisinesArr.map((cuisine, index) => 
                                        <Item 
                                        key={index}
                                        name={cuisine}
                                        addIngredient={false}
                                        stateVar={"cuisines"}
                                        handleIngredientRemove={this.handleIngredientRemove}
                                        />
                                    )}
                                </div>
                            </div>
                            <Button className={styles.nextButton} variant="dark">next</Button>
                            </>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
 
export default FormContainer;