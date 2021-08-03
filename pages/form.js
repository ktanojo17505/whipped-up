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
import {cuisineChoices} from '../components/cuisineChoicesList';
import CuisineDropdown from '../components/cuisineDropdown';

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
            dietaryRestrictions: [
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
            diet: "",
            maxReadyTime: "",
            minCalories: "",
            maxCalories: "",
            toSkip: {
                time: false,
                calories: false,
                cuisine: false
            },
            searchTerm: "",
            searchResults: [],
        }
        this.handleIngredientSubmit = this.handleIngredientSubmit.bind(this);
        this.handleIngredientRemove = this.handleIngredientRemove.bind(this);
        this.handleNextForm = this.handleNextForm.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleMinMaxSubmit = this.handleMinMaxSubmit.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.handleCuisine = this.handleCuisine.bind(this);
    }

    handleIngredientSubmit(e, stateKey) {
        if (e.key === "Enter"){
            this.setState({[stateKey]: [ ...this.state[stateKey], e.target.value]});
            e.target.value = "";
        }
    }

    handleIngredientRemove(input, stateKey){
        var arr = this.state[stateKey]; 
        var index = arr.indexOf(input);
        arr.splice( index, 1 );
        this.setState({[stateKey] : arr});
    }

    handleNextForm(nextStep){
        this.setState({step: nextStep});
    }

    handleCheck(diet){
        var dietArr = this.state.dietaryRestrictions; 
        var prevDiet = this.state.diet; 
        dietArr.find((obj) => {
            if (obj.diet == diet){
                obj.isChecked = true;
            }
            if (obj.diet == prevDiet){
                obj.isChecked = false; 
            } 
        });
        this.setState({dietaryRestrictions: dietArr});
        this.setState({diet: diet});
    }

    handleMinMaxSubmit(e, stateKey){
        this.setState({[stateKey]: e.target.value});
    }

    handleSkip(inputType){
        var toSkipMap = this.state.toSkip; 
        toSkipMap[inputType] = !toSkipMap[inputType];
        this.setState({toSkip: toSkipMap});
        switch (inputType){
            case "time":
                this.setState({maxReadyTime: ""});
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

    // function that if a user clicks on a cusine or presses enter it will push back in the cusine array
    handleCuisine(cuisine){
        const chosenCuisineArr = cuisineChoices.filter((cuisineChoice) => {
            return cuisineChoice.toLowerCase() === cuisine.toLowerCase();
        });
        if (chosenCuisineArr.length === 1){
            let chosenCuisine = chosenCuisineArr[0];
            if (this.state.cuisines.indexOf(chosenCuisine) === -1){ // valid cuisine that the user entered or clicked and the user hasnt put that cuisine in yet
                this.setState({cuisines: [...this.state.cuisines, chosenCuisine]})
                this.setState({searchResults: []}); 
                this.setState({searchTerm: ""})
            }
            else {
                alert("This cuisine has already been added!");
            }
        }
        else{
            alert("Not a valid cuisine choice");
        }
    }

    // function that filters input based on what the user types 
    searchHandler(searchTerm){
        this.setState({searchTerm: searchTerm});
        if (searchTerm !== ""){
            const cuisineList = cuisineChoices.filter((cuisine) => {
                return cuisine.toLowerCase().includes(searchTerm.toString().toLowerCase());
            });
            this.setState({searchResults: cuisineList});
        }
        else{
            this.setState({searchResults: []});
        }
    }

    render() { 
        const ingredientArr = this.state.ingredients;
        const ingredientRemArr = this.state.ingredientsRemove;
        const equipmentArr = this.state.equipment; 
        const cuisinesArr = this.state.cuisines; 
        const dietMap = this.state.dietaryRestrictions; 
        const diet = this.state.diet; 
        const toSkip = this.state.toSkip; 
        const step = this.state.step; 
        const maxReadyTime = this.state.maxReadyTime; 
        const minCalories = this.state.minCalories;
        const maxCalories = this.state.maxCalories;
        const searchTerm = this.state.searchTerm; 
        const searchResults = this.state.searchResults;
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
                                    isCuisineInput={false}
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
                                    isCuisineInput={false}
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
                                        isCuisineInput={false}
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
                                        <div className={styles.minMax}>
                                            <p className={styles.title} style={{marginBottom: 0}}>Max Ready Time</p>
                                            <MinMaxInput 
                                                label={"max minutes"}
                                                stateKey={"maxReadyTime"}
                                                handleMinMaxSubmit={this.handleMinMaxSubmit}
                                                inputValue={this.state.maxReadyTime}
                                            />
                                        </div>
                                        <div className={styles.minMax}>
                                            <p className={styles.title} style={{marginBottom: 0}}>Calorie Range</p>
                                            <MinMaxInput 
                                                label={"min calories"}
                                                stateKey={"minCalories"}
                                                handleMinMaxSubmit={this.handleMinMaxSubmit}
                                                inputValue={this.state.minCalories}
                                            />
                                            <MinMaxInput 
                                                label={"max calories"}
                                                stateKey={"maxCalories"}
                                                handleMinMaxSubmit={this.handleMinMaxSubmit}
                                                inputValue={this.state.maxCalories}
                                            /> 
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.deleteItems}>
                                    <InputSearchBar 
                                        label={"The cuisines you're interested in"}
                                        name={"cuisines"}
                                        handleIngredientSubmit={this.handleIngredientSubmit}
                                        isCuisineInput={true}
                                        searchTerm={searchTerm}
                                        searchKeyword={this.searchHandler}
                                        handleCuisine={this.handleCuisine}

                                    />
                                    {searchResults.length > 0 && 
                                        <CuisineDropdown 
                                            cuisineChoices={searchResults}
                                            handleCuisine={this.handleCuisine}
                                        />
                                    }
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
                                        <label className={styles.skipText}>
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
                                                diet: diet,
                                                maxReadyTime: maxReadyTime,
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