import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import { verifyLogin, updateProfile } from '../actions'

class UpdateProfile extends React.Component {
    constructor(props){
        super(props)
        this.state={
                street_address:'',
                city:'',
                user_state:'',
                zipcode:''
        }
    }
    
    handleUpdateAddressSubmit = (e) => {
        e.preventDefault();
        const addressObj = this.state
        const userToken = localStorage.getItem('user')
        let history = this.props.history
        console.log('update form submitted', addressObj, userToken)
        this.props.updateProfile(addressObj, userToken, history);
        this.clearForm();
    }

    clearForm = () => {
        this.setState({
            street_address:'',
            city:'',
            user_state:'',
            zipcode:''
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkLoggedIn = () => {
        switch (localStorage.getItem('user')){
            case localStorage.getItem('user') != undefined && this.props.user ==[]:
                this.props.verifyLogin(localStorage.getItem('user'))
                return true
            case (!localStorage.getItem('user') || localStorage.getItem('user')== undefined) && !this.props.user ==[]:
                    return false
            case (!localStorage.getItem('user') || localStorage.getItem('user')== undefined) && this.props.user:
                localStorage.setItem('user', this.props.user.jwt)
                return true
            case localStorage.getItem('user')!= undefined && this.props.user:
                return true
            default:
                return false
        }
    }

    render(){
        return (<Switch>
            < Route path='/update-user-profile' render={ () => {
                return(
                    <div>
                        {this.checkLoggedIn() ? <div>Update Profile Page Loading, please wait ...</div> :
            <div className='user-card'>
                <p>Name: {this.props.user.name}</p>
                <p>Username: {this.props.user.username}</p>
                <p>Current Address: <br/>{this.props.user.street_address}<br/> {this.props.user.city}{this.props.user.displayState ? <>,{this.props.user.displayState.abbreviation}</> : null} <br/> {this.props.user.zipcode} </p>
                <hr width='35%'/>
                <form onSubmit={(e) => this.handleUpdateAddressSubmit(e)}>
                    <label>Update your stored address:</label>
                    <br/>
                    <label>Street Address: </label>
                        <input type='text' name='street_address' onChange={(e)=> this.handleInputChange(e)} value={this.state.street_address} />
                        <br />
                    <label>City: </label>
                        <input type='text' name='city' onChange={(e)=> this.handleInputChange(e)} value={this.state.city} />
                        <br />
                    <label>Two-Letter State Abbreviation: </label>
                        <input type='text' name='user_state' onChange={(e)=> this.handleInputChange(e)} value={this.state.user_state} />
                        <br />
                    <label>Zip Code: </label>
                        <input type='text' name='zipcode' onChange={(e)=> this.handleInputChange(e)} value={this.state.zipcode} />
                    <input type='submit' />
                </form>
            </div>
        }
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
        user: state.loggedInUser,
        displayState: state.loggedInUser.state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        verifyLogin: (token) => {
            dispatch(verifyLogin(token))
        },
        updateProfile: (address, token, history) => {
            dispatch(updateProfile(address, token, history))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)