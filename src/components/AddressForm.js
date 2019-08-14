import React from 'react';
import { connect } from 'react-redux';

class AddressForm extends React.Component {
    constructor(props){
        super(props)
        this.state={
            street_address:'',
            city:'',
            state:'',
            zipcode:''
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log('form submitted')
        const addressObj = this.state
        this.props.submitForm(addressObj);
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    render(){
        return(
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <br/>
                <label>Street Address: </label>
                    <input type='text' name='street_address' onChange={(e)=> this.handleInputChange(e)}/>
                <label>City: </label>
                    <input type='text' name='city' onChange={(e)=> this.handleInputChange(e)}/>
                    <br />
                <label>Two-Letter State Abbreviation: </label>
                    <input type='text' name='state' onChange={(e)=> this.handleInputChange(e)} placeholder='Ex: AL, CA, OH'/>
                    <br />
                <label>Zip Code: </label>
                    <input type='text' name='zipcode' onChange={(e)=> this.handleInputChange(e)}/>
                <input type='submit' />
            </form>
        )
    }
}

export default AddressForm