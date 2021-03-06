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
        this.clearForm();
    }

    clearForm = () => {
        this.setState({
            street_address:'',
            city:'',
            state:'',
            zipcode:''
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    render(){
        return(
            <form className='match-address-form' onSubmit={(e) => this.handleSubmit(e)}>
                <p className='match-input'>Street Address:<input type='text' name='street_address' onChange={(e)=> this.handleInputChange(e)} value={this.state.street_address} placeholder='Ex: 123 Main Street'/></p>
                <p className='match-input'>City:<input type='text' name='city' onChange={(e)=> this.handleInputChange(e)} value={this.state.city} placeholder='Ex: Binghamton, Kansas City'/></p>
                <p className='match-input'>Two-Letter State Abbreviation: <input type='text' name='state' onChange={(e)=> this.handleInputChange(e)} value={this.state.state} placeholder='Ex: AL, CA, OH'/></p>
                <p className='match-input'>Zip Code:<input type='text' name='zipcode' onChange={(e)=> this.handleInputChange(e)} value={this.state.zipcode} placeholder='Ex: 12345, 45678'/></p>
                <input className='submit-btn' type='submit' />
            </form>
        )
    }
}

export default connect()(AddressForm)