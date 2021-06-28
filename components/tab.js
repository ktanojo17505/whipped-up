import React from "react";
import styles from "../styles/form.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CSSTransition } from "react-transition-group";

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const isSelected = this.props.isSelected;
        const description = this.props.description; 
        const step = this.props.step; 
        if (isSelected){
            return ( 
                <CSSTransition>
                    <div className={styles.tabSelected}>
                        {description}
                    </div>
                </CSSTransition>
            );
        } 
        else {
            return ( 
                <div className={styles.tab} onClick={() => this.props.handleNextForm(step)}>
                    {description}
                </div>
            );
        }
    }
}
 
export default Tab;