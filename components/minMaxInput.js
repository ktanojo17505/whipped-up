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
        return ( 
        <div>
            <p className={styles.label}>{label}</p>
            <input className={styles.inputNumbers} type="text" onChange={(e) => this.props.handleMinMaxSubmit(e, stateKey)}></input>
        </div>
        );
    }
}
 
export default MinMaxInput;