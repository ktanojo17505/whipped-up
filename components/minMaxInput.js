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
        const minLabel = this.props.minLabel; 
        const maxLabel = this.props.maxLabel; 
        const minState = this.props.minState; 
        const maxState = this.props.maxState; 
        return ( 
        <div className={styles.minMax}>
            <p className={styles.title} style={{marginBottom: 0}}>{description}</p>
            <p className={styles.label}>{minLabel}</p>
            <input className={styles.inputNumbers} type="text" onKeyDown={(e) => this.props.handleMinMaxSubmit(e, minState)}></input>
            <p className={styles.label}>{maxLabel}</p>
            <input className={styles.inputNumbers} type="text" onKeyDown={(e) => this.props.handleMinMaxSubmit(e, maxState)}></input>
            {/* <button>skip</button> */}
        </div>
            
        );
    }
}
 
export default MinMaxInput;