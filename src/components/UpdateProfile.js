import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import { verifyLogin, updateProfile } from '../actions'

class UpdateProfile extends React.Component {
    constructor(props){
        super(props)
        this.state={
                user_state:'',
                name:''
        }
    }
    
    handleUpdateAddressSubmit = (e) => {
        e.preventDefault();
        const userObj = this.state
        const userToken = localStorage.getItem('user')
        let history = this.props.history
        this.props.updateProfile(userObj, userToken, history);
        this.clearForm();
    }

    clearForm = () => {
        this.setState({
            user_state:'',
            name:''
        })
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSelectChange = (e) => {
        this.setState({user_state: e.target.value})
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
            <div className='update-user-card'>
                <h3>Currently logged in as : <span id='uppercase'>{this.props.user.username}</span></h3>
                <hr width='35%'/>
                <form onSubmit={(e) => this.handleUpdateAddressSubmit(e)}>
                    <h3>Let's update your user profile, {this.props.user.name}!</h3>
                    <p className='update-input'>Name: 
                        <input type="text" name="name" value={this.state.name} onChange={(e)=> this.handleChange(e)} placeholder="Enter your name here" required /></p>
                    <p className='update-input'>Select a US state or US territory by name:
                        <select onChange={(e) => this.handleSelectChange(e)} required>
                        <option value='AL'>Alabama</option>
                        <option value='AK'>Alaska</option>
                        <option value='AZ'>Arizona</option>
                        <option value='AR'>Arkansas</option>
                        <option value='CA'>California</option>
                        <option value='CO'>Colorado</option>
                        <option value='CT'>Connecticut</option>
                        <option value='DE'>Delaware</option>
                        <option value='DC'>District of Columbia</option>
                        <option value='FL'>Florida</option>
                        <option value='GA'>Georgia</option>
                        <option value='HI'>Hawaii</option>
                        <option value='ID'>Idaho</option>
                        <option value='IL'>Illinois</option>
                        <option value='IN'>Indiana</option>
                        <option value='IA'>Iowa</option>
                        <option value='KS'>Kansas</option>
                        <option value='KY'>Kentucky</option>
                        <option value='LA'>Louisiana</option>
                        <option value='ME'>Maine</option>
                        <option value='MD'>Maryland</option>
                        <option value='MA'>Massachussetts</option>
                        <option value='MI'>Michigan</option>
                        <option value='MN'>Minnesota</option>
                        <option value='MS'>Mississippi</option>
                        <option value='MO'>Missouri</option>
                        <option value='MT'>Montana</option>
                        <option value='NE'>Nebraska</option>
                        <option value='NV'>Nevada</option>
                        <option value='NH'>New Hampshire</option>
                        <option value='NJ'>New Jersey</option>
                        <option value='NM'>New Mexico</option>
                        <option value='NY'>New York</option>
                        <option value='NC'>North Carolina</option>
                        <option value='ND'>North Dakota</option>
                        <option value='OH'>Ohio</option>
                        <option value='OK'>Oklahoma</option>
                        <option value='OR'>Oregon</option>
                        <option value='PA'>Pennsylvania</option>
                        <option value='RI'>Rhode Island</option>
                        <option value='SC'>South Carolina</option>
                        <option value='SD'>South Dakota</option>
                        <option value='TN'>Tennessee</option>
                        <option value='TX'>Texas</option>
                        <option value='UT'>Utah</option>
                        <option value='VT'>Vermont</option>
                        <option value='VA'>Virginia</option>
                        <option value='WA'>Washington</option>
                        <option value='WV'>West Virginia</option>
                        <option value='WI'>Wisconsin</option>
                        <option value='WY'>Wyoming</option>
                        <option value='PR'>Puerto Rico</option>
                        <option value='GU'>Guam</option>
                        <option value='AS'>American Samoa</option>
                        <option value='MP'>Marianas Islands</option>
                        <option value='VI'>Virgin Islands</option>
                        </select></p>
                        <br />
                    <input className='submit-btn' type='submit' />
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
        updateProfile: (userInfo, token, history) => {
            dispatch(updateProfile(userInfo, token, history))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)