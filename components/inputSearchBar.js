import React from "react";
import styles from "../styles/form.module.css";
import searchIcon from "../public/images/searchicon.svg";
import Image from "next/image"


class InputSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    render() { 
        const label = this.props.label;
        const name = this.props.name;
        return ( 
            <>
                <h1 className={styles.title}>{label}</h1>
                <div className={styles.searchBar}>
                    <div className={styles.searchIcon}>
                        <Image src={searchIcon} width={36} height={28}></Image>
                    </div>
                    <input className={styles.input} type="text" onKeyDown={(e) => this.props.handleIngredientSubmit(e, name)}></input>
                </div>
            </>
        );
    }
}
 
export default InputSearchBar;