import React from "react";
import styles from "../styles/form.module.css";

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const isChecked = this.props.isChecked; 
        const diet = this.props.diet; 
        if (isChecked){
            return ( 
                <div className={styles.checkbox} onClick={() => this.props.handleCheck(diet)}>
                    <p className={styles.diet}>{diet}</p>
                </div>
            );
        }
        else{
            return ( 
                <div className={styles.checkboxRem} onClick={() => this.props.handleCheck(diet)}>
                    <p className={styles.diet}>{diet}</p>
                </div>
            );
        }
    }
}
 
export default Checkbox;