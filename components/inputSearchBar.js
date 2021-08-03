import React from "react";
import styles from "../styles/form.module.css";
import searchIcon from "../public/images/searchicon.svg";
import Image from "next/image"


class InputSearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  };
        this.handleCuisineEnter = this.handleCuisineEnter.bind(this);
    }

    handleCuisineEnter(e){
        if (e.key === "Enter"){
            this.props.handleCuisine(e.target.value);
        }
    }

    render() { 
        const label = this.props.label;
        const name = this.props.name;
        const isCuisineInput = this.props.isCuisineInput; 
        return ( 
            <>
                <h1 className={styles.title}>{label}</h1>
                <div className={styles.searchBar}>
                    <div className={styles.searchIcon}>
                        <Image src={searchIcon} width={36} height={28}></Image>
                    </div>
                    {!isCuisineInput ? 
                        <input className={styles.input} type="text" onKeyDown={(e) => this.props.handleIngredientSubmit(e, name)}></input>
                        :
                        <input className={styles.input} type="text" value={this.props.searchTerm} onChange={(e) => this.props.searchKeyword(e.target.value)} onKeyDown={(e) => this.handleCuisineEnter(e)}></input>
                    }
                </div>
            </>
        );
    }
}
 
export default InputSearchBar;