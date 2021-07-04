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
import Link from "next/link";

//TODO: MaxReadyTime --> only one input 
//TODO: can only choose one dietary restriction (make it radio buttons and once clicked will change diet state)
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
            minTime: "",
            maxTime: "",
            minCalories: "",
            maxCalories: "",
            toSkip: {
                time: true,
                calories: false,
                cuisine: false
            }
        }
        this.handleIngredientSubmit = this.handleIngredientSubmit.bind(this);
        this.handleIngredientRemove = this.handleIngredientRemove.bind(this);
        this.handleNextForm = this.handleNextForm.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleMinMaxSubmit = this.handleMinMaxSubmit.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
    }

    handleIngredientSubmit(e, stateKey) {
        if (e.key == "Enter"){
            var ingredientsArray = this.state[stateKey]; 
            this.setState({[stateKey]: [ ...this.state[stateKey], e.target.value]});
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
        this.setState({[stateKey]: e.target.value}, () => {
            console.log(e.target.value, this.state[stateKey]);
        });
    }

    handleSkip(inputType){
        var toSkipMap = this.state.toSkip; 
        toSkipMap[inputType] = !toSkipMap[inputType];
        this.setState({toSkip: toSkipMap}, () => {
            console.log(this.state.toSkip)
        });
        switch (inputType){
            case "time":
                this.setState({minTime: ""});
                this.setState({maxTime: ""});
                break;
            case "calories":
                this.setState({minCalories: ""});
                this.setState({maxCalories: ""});
                break;
            case "cuisine":
                if (this.state.cuisines.length > 0){
                    this.setState({cuisines: []});
                };
                break;
        }
    }

    render() { 
        const ingredientArr = this.state.ingredients;
        const ingredientRemArr = this.state.ingredientsRemove;
        const equipmentArr = this.state.equipment; 
        const cuisinesArr = this.state.cuisines; 
        const dietMap = this.state.dietaryRestriction; 
        const toSkip = this.state.toSkip; 
        const step = this.state.step; 
        const minTime = this.state.minTime; 
        const maxTime = this.state.maxTime;
        const minCalories = this.state.minCalories;
        const maxCalories = this.state.maxCalories;
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
                                            minVal={minTime}
                                            maxVal={maxTime}
                                            handleMinMaxSubmit={this.handleMinMaxSubmit}
                                        />
                                        <MinMaxInput 
                                            description={"Calorie range is"}
                                            minLabel={"min calories"}
                                            maxLabel={"max calories"}
                                            minState={"minCalories"}
                                            maxState={"maxCalories"}
                                            minVal={minCalories}
                                            maxVal={maxCalories}
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
                                    <div className={styles.buttonGroup}> 
                                        <label>
                                            click to skip
                                        </label>
                                        <Button className={styles.skipButton} variant={toSkip["time"] ? "secondary" : "outline-secondary"} style={{marginLeft: 10}} onClick={() => this.handleSkip("time")}>time</Button>
                                        <Button className={styles.skipButton} variant={toSkip["calories"] ? "secondary" : "outline-secondary"} style={{marginLeft: 10}} onClick={() => this.handleSkip("calories")}> calories</Button>
                                        <Button className={styles.skipButton} variant={toSkip["cuisine"] ? "secondary" : "outline-secondary"} style={{marginLeft: 10}} onClick={() => this.handleSkip("cuisine")}>cuisine</Button>
                                        <Link href={{
                                            pathname: "/results",
                                            query: {
                                                ingredients: ingredientArr,
                                                ingredientsRemove: ingredientRemArr,
                                                equipment: equipmentArr,
                                                cuisine: cuisinesArr,
                                                diet: JSON.stringify(dietMap),
                                                minTime: minTime,
                                                maxTime: maxTime,
                                                minCalories: minCalories,
                                                maxCalories: maxCalories
                                            }
                                        }}>
                                            <Button className={styles.nextButton} variant="dark" style={{marginLeft: 10}}>results</Button>
                                        </Link>
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