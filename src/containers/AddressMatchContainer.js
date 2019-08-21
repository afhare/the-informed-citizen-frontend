import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import AddressDisplay from '../components/AddressDisplay';
import AddressForm from '../components/AddressForm';
import Loader  from '../components/Loader';

class AddressMatchContainer extends React.Component {
    constructor(props){
        super(props)
        this.state={
            submitted_form: false,
            street_address:'',
            city:'',
            state:'',
            zipcode:''
        }
    }

    submitForm = (stateObj) => {
        this.setState({
            submitted_form: true,
            street_address: stateObj.street_address,
            city: stateObj.city,
            state: stateObj.state,
            zipcode: stateObj.zipcode
        })
    }


    updateFormSubmit = () => {
        this.setState({
            submitted_form: false
        })
    }

    renderContainer = () => {
        return (
            <div className='address-match-container'>
                <h3>Enter an address to find your representatives and senators:</h3>
                <AddressForm submitForm={this.submitForm} />
                <hr width='25%' />
                <h3>Based on your address, your corresponding representatives and senators will display below:</h3>
                <AddressDisplay displayAddress={this.state} handleGoogleAPIRequest={this.handleGoogleAPIRequest}/>
            </div>
        )
    }

    render(){
        return (
        <Switch>
            < Route path='/address-search' render={ () => {
                return(
                    <div>
                        {this.props.loader ? <Loader/> : this.renderContainer()}
                    </div>
                )
            }}
            />
        </Switch>
        )
    }

}
    const mapStateToProps = (state) => {
        return {
            loader: state.loader
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(AddressMatchContainer)