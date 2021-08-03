import React from 'react';

class CuisineDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    // TODO: Onclick handler so that when the user clicks it adds the cusine to the cuisine list selected 
    render() { 
        const renderCuisineList = this.props.cuisineChoices.map((cuisine, index) => {
            return (
                <div key={index} style={{cursor: 'default'}} onClick={() => this.props.handleCuisine(cuisine)}>
                    {cuisine}
                </div>
            )
        })
        return ( 
            <>
            <div style={{height: '500px', width:'500px'}}>
                {renderCuisineList}
            </div>
            </>
        );
    }
}
 
export default CuisineDropdown;