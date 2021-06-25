import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import searchIcon from "../public/images/searchicon.svg";
import Image from "next/image"
import styles from "../styles/form.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Item from "../components/item.js";


class FormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            ingredients: [],
            ingredientsRemove: []
        }
        this.handleIngredientSubmit = this.handleIngredientSubmit.bind(this);
        this.handleIngredientRemove = this.handleIngredientRemove.bind(this);
    }

    handleIngredientSubmit(e, stateKey) {
        if (e.key == "Enter"){
            var ingredientsArray = this.state[stateKey]; 
            ingredientsArray.push(e.target.value); 
            this.setState({[stateKey]: ingredientsArray});
            console.log(this.state.ingredients)
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

    render() { 
        const ingredientArr = this.state.ingredients;
        const ingredientRemArr = this.state.ingredientsRemove;
        return ( 
            <div className={styles.outerContainer}>
                <div className={`col align-items-start ${styles.rightBlock}`}>
                    <h1 className={`col-sm-12 ${styles.mainHeading}`}>First, let's settle the ingredients.</h1>
                    <div className={`col-3 ${styles.tabGroup}`}>
                        <div className={styles.tab}>
                        ingredients
                        </div>
                        <div className={styles.tab}>equipment & diet</div>
                        <div className={styles.tab}>extras</div>
                    </div>
                    <div className={`.col-sm-9 ${styles.outerForm}`}>
                        <div className={styles.addItems}>
                            <h1 className={styles.title}>Your leftover Ingredients are</h1>
                            <div className={styles.searchBar}>
                                <div className={styles.searchIcon}>
                                    <Image src={searchIcon} width={36} height={28}></Image>
                                </div>
                                <input className={styles.input} type="text" onKeyDown={(e) => this.handleIngredientSubmit(e, "ingredients")}></input>
                            </div>
                            <div className={`.overflow-auto ${styles.items}`}> 
                                {ingredientArr.map((ingredient, index) => 
                                    <Item 
                                    key={index}
                                    name={ingredient}
                                    addIngredient={true}
                                    handleIngredientRemove={this.handleIngredientRemove}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={styles.deleteItems}>
                            <h1 className={styles.title}>Ingredients to remove from all recipes</h1>
                            <div className={styles.searchBar}>
                                <div className={styles.searchIcon}>
                                    <Image src={searchIcon} width={36} height={28}></Image>
                                </div>
                                <input className={styles.input} type="text" onKeyDown={(e) => this.handleIngredientSubmit(e, "ingredientsRemove")}></input>
                            </div>
                            <div className={styles.items}>
                                {ingredientRemArr.map((ingredient, index) => 
                                    <Item 
                                    key={index}
                                    name={ingredient}
                                    addIngredient={false}
                                    handleIngredientRemove={this.handleIngredientRemove}
                                    />
                                )}
                            </div>
                        </div>
                        <Button className={`col-3 ${styles.nextButton}`} variant="dark">next</Button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default FormContainer;