import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import searchIcon from "../public/images/searchicon.svg";
import xButton from "../public/images/xbutton.svg";
import Image from "next/image"
import styles from "../styles/form.module.css";


class FormContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 

        }
    }

    render() { 
        return ( 
            <div className={styles.outerContainer}>
                <h1 className={styles.mainHeading}>First, let's settle the ingredients.</h1>
                <div className={styles.outerForm}>
                    <div className={styles.addItems}>
                        <h1 className={styles.title}>Your leftover Ingredients are</h1>
                        <div className={styles.searchBar}>
                            <div className={styles.searchIcon}>
                                <Image src={searchIcon} width={36} height={28}></Image>
                            </div>
                            <input className={styles.input} type="text"></input>
                        </div>
                        <div className={styles.items}>
                            <div className={styles.itemContainer}>
                                <div className={styles.xButton}>
                                    <Image className={styles.xButton} src={xButton} width={21} height={21}></Image>
                                </div>
                                <p className={styles.ingredient}>brocolli</p>
                            </div>
                            <div className={styles.itemContainer}>
                                <div className={styles.xButton}>
                                    <Image className={styles.xButton} src={xButton} width={21} height={21}></Image>
                                </div>
                                <p className={styles.ingredient}>mozarella</p>
                            </div>
                            <div className={styles.itemContainer}>
                                <div className={styles.xButton}>
                                    <Image className={styles.xButton} src={xButton} width={21} height={21}></Image>
                                </div>
                                <p className={styles.ingredient}>oat milk</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.deleteItems}>
                        <h1 className={styles.title}>Ingredients to remove from all recipes</h1>
                        <div className={styles.searchBar}>
                            <div className={styles.searchIcon}>
                                <Image src={searchIcon} width={36} height={28}></Image>
                            </div>
                            <input className={styles.input} type="text"></input>
                        </div>
                        <div className={styles.items}>
                            <div className={styles.itemContainer}>
                                <div className={styles.xButton}>
                                    <Image className={styles.xButton} src={xButton} width={21} height={21}></Image>
                                </div>
                                <p className={styles.ingredient}>brocolli</p>
                            </div>
                            <div className={styles.itemContainer}>
                                <div className={styles.xButton}>
                                    <Image className={styles.xButton} src={xButton} width={21} height={21}></Image>
                                </div>
                                <p className={styles.ingredient}>mozarella</p>
                            </div>
                            <div className={styles.itemContainer}>
                                <div className={styles.xButton}>
                                    <Image src={xButton} width={21} height={21}></Image>
                                </div>
                                <p className={styles.ingredient}>oat milk</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button>Next</button>
            </div>
        );
    }
}
 
export default FormContainer;