import React from "react";
import styles from "../styles/form.module.css";

class MinMaxInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    // TODO: button on click set target values of input to null and go to handler
    render() { 
        const description = this.props.description;
        const label = this.props.label; 
        const stateKey = this.props.stateKey; 
        const inputValue = this.props.inputValue;
        return ( 
        <div>
            <p className={styles.label}>{label}</p>
            <input value={inputValue} pattern= "[0-9]" className={styles.inputNumbers} type="text" onChange={(e) => this.props.handleMinMaxSubmit(e, stateKey)}></input>
        </div>
        );
    }
}
 
export default MinMaxInput;