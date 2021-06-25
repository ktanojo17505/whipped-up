import React from "react";
import styles from "../styles/form.module.css";
import xButton from "../public/images/xbutton.svg";
import Image from "next/image"

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(){
        console.log("in handle change");
        if (this.props.addIngredient){
            this.props.handleIngredientRemove(this.props.name, "ingredients");
        }
        else {
            this.props.handleIngredientRemove(this.props.name, "ingredientsRemove");
        }
    }

    render() {
        const name = this.props.name; 
        const addIngredient = this.props.addIngredient; 
        if (addIngredient){
            return ( 
                <div className={styles.itemContainer}>
                    <div className={styles.xButton} onClick={this.handleChange}>
                        <Image className={styles.xButton} src={xButton} width={21} height={21}></Image>
                    </div>
                    <p className={styles.ingredient}>{name}</p>
                </div> );
        }
        else {
            return ( 
                <div className={styles.itemContainerRem}>
                    <div className={styles.xButton} onClick={this.handleChange}>
                        <Image className={styles.xButton} src={xButton} width={21} height={21}></Image>
                    </div>
                    <p className={styles.ingredient}>{name}</p>
                </div> );
        }
    }
}
 
export default Item;