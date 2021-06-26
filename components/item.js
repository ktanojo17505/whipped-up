import React from "react";
import styles from "../styles/form.module.css";
import xButton from "../public/images/xbutton.svg";
import searchIcon from "../public/images/searchicon.svg";

import Image from "next/image"

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() {
        const name = this.props.name; 
        const addIngredient = this.props.addIngredient; 
        const label = this.props.label; 
        const stateVar = this.props.stateVar; 
        if (addIngredient){
            return (
                <div className={styles.itemContainer}>
                    <div className={styles.xButton} onClick={() => this.props.handleIngredientRemove(name, stateVar)}>
                        <Image className={styles.xButton} src={xButton} width={21} height={21}></Image>
                    </div>
                    <p className={styles.ingredient}>{name}</p>
                </div> 
            );
        }
        else {
            return ( 
                <div className={styles.itemContainerRem}>
                    <div className={styles.xButton} onClick={() => this.props.handleIngredientRemove(name, stateVar)}>
                        <Image className={styles.xButton} src={xButton} width={21} height={21}></Image>
                    </div>
                    <p className={styles.ingredient}>{name}</p>
                </div> );
        }
    }
}
 
export default Item;