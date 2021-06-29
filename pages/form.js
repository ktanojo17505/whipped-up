import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import styles from "../styles/form.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Item from "../components/item.js";
import InputSearchBar from "../components/inputSearchBar";
import mCustomScrollbar from "malihu-custom-scrollbar-plugin";
import Checkbox from "../components/checkbox.js";
import MinMaxInput from "../components/minMaxInput.js";
import Tab from "../components/tab.js";

// https://css-tricks.com/functional-css-tabs-revisited/

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
            minTime: null,
            maxTime: null,
            minCalories: null,
            maxCalories: null,
        }
        this.handleIngredientSubmit = this.handleIngredientSubmit.bind(this);
        this.handleIngredientRemove = this.handleIngredientRemove.bind(this);
        this.handleNextForm = this.handleNextForm.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleMinMaxSubmit = this.handleMinMaxSubmit.bind(this);
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
        console
    }

    // TODO: set this so that it takes in an int that will be the next step of the form
    handleNextForm(nextStep){
        this.setState({step: nextStep});
    }

    handleCheck(diet){
        var dietArr = this.state.dietaryRestriction; 
        dietArr.find((obj) => {
            if (obj.diet == diet){
                obj.isChecked = !obj.isChecked;
            } 
        });
        this.setState({dietaryRestriction: dietArr})
    }

    handleMinMaxSubmit(e, stateKey){
        if (e.key == "Enter"){
            // console.log(e.target.value);
            this.setState({[stateKey]: e.target.value}, () => {
                console.log(e.target.value, this.state[stateKey])
            });
            e.target.blur();
        }
        // console.log(this.state[stateKey]);
    }

    handleSkip(inputType){
        if (inputType == "time"){
            this.setState({minTime: null});
            this.setState({maxTime: null});
        }
        else{
            this.setState({minCalories: null});
            this.setState({maxCalories: null});
        }
    }

    render() { 
        const ingredientArr = this.state.ingredients;
        const ingredientRemArr = this.state.ingredientsRemove;
        const equipmentArr = this.state.equipment; 
        const cuisinesArr = this.state.cuisines; 
        const dietMap = this.state.dietaryRestriction; 
        // dietMap.map((diet, index) => console.log(diet));
        const step = this.state.step; 
        return ( 
            <>
            <div className={styles.wrapper}>
                <div className={styles.wave}>
                    <div className={styles.wave2}>
                    </div>
                </div>
            </div>
            <div className={styles.outerContainer}>
                <div className={`${styles.rightBlock}`}>
                    <div className={`col-3 ${styles.tabGroup}`}>
                        <Tab 
                            isSelected={step === 0}
                            description={"ingredients"}
                            step={0}
                            handleNextForm = {this.handleNextForm}
                        />
                        <Tab 
                            isSelected={step === 1}
                            description={"equipment & diet"}
                            step={1}
                            handleNextForm = {this.handleNextForm}
                        />
                        <Tab 
                            isSelected={step === 2}
                            description={"extras"}
                            step={2}
                            handleNextForm = {this.handleNextForm}
                        />
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
                            <Button className={styles.nextButton} variant="dark" onClick={() => this.handleNextForm(step+1)}>next</Button>
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
                                            key={index}
                                            isChecked={dietaryRestriction.isChecked}
                                            diet={dietaryRestriction.diet}
                                            handleCheck={this.handleCheck}
                                            />
                                        )}
                                    </div>
                                </div>
                                <Button className={styles.nextButton} variant="dark" onClick={() => this.handleNextForm(step+1)}>next</Button>
                            </>
                        }
                        {step == 2 && 
                            <>
                                <div className={styles.addItems}>
                                    <div className={styles.extras}>
                                        <MinMaxInput 
                                            description={"Time range is"}
                                            minLabel={"min minutes"}
                                            maxLabel={"max minutes"}
                                            minState={"minTime"}
                                            maxState={"maxTime"}
                                            handleMinMaxSubmit={this.handleMinMaxSubmit}
                                        />
                                        <MinMaxInput 
                                            description={"Calorie range is"}
                                            minLabel={"min calories"}
                                            maxLabel={"max calories"}
                                            minState={"minCalories"}
                                            maxState={"maxCalories"}
                                            handleMinMaxSubmit={this.handleMinMaxSubmit}
                                        />
                                    </div>
                                </div>
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
                                <div className={styles.lastButtons}>
                                    <label>
                                        click to skip
                                    </label>
                                    <div className={styles.buttonGroup}> 
                                        <Button className={styles.nextButton} variant="outline-dark" style={{marginLeft: 10}}>time</Button>
                                        <Button className={styles.nextButton} variant="outline-dark" style={{marginLeft: 10}}>calories</Button>
                                        <Button className={styles.nextButton} variant="outline-dark" style={{marginLeft: 10}}>cuisine</Button>
                                        <Button className={styles.nextButton} variant="dark" style={{marginLeft: 10}}>results</Button>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
        );
    }
}
 
export default FormContainer;