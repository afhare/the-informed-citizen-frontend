import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions'
import Loader  from '../components/Loader';
import flag  from '../true-color-flag.svg'

class RegisterContainer extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            name:'',
            user_state:''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSelectChange = (e) => {
        this.setState({user_state: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.register({user: this.state}, this.props.history)
        this.setState({
            username: '',
            password: '',
            name:'',
            user_state:''
        })
    }

    renderRegister = () => {
        const quotes =['Let us never forget that government is ourselves and not an alien power over us. The ultimate rulers of our democracy are not a President and senators and congressmen and government officials, but the voters of this country. -Franklin D. Roosevelt', 'Patriotism is supporting your country all the time, and your government when it deserves it. -Mark Twain', 'We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.']
        return (
            <div className='register-form'>
                <img className='register-logo' src={flag} alt='Dome of Congress Building' />
                <h3>Create an account on The Informed Citizen</h3>
                <p>{quotes[Math.floor(Math.random()*quotes.length)]}</p>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <p className='register-input'>Username:  
                        <input type="text" name="username" value={this.state.username} onChange={(e)=> this.handleChange(e)} placeholder="Enter username here" required /></p>
                    <p className='register-input'>Password:  
                        <input type="password" name="password" value={this.state.password} onChange={(e)=> this.handleChange(e)} placeholder="Enter password here" required/></p>
                    <p className='register-input'>Name: 
                        <input type="text" name="name" value={this.state.name} onChange={(e)=> this.handleChange(e)} placeholder="Enter your name here" required /></p>
                    <p className='register-input'>Select a US state or US territory by name:
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
                    <br />
                    <input className='submit-btn' type='submit'/>
                </form>
            </div>
        )
    }

    render(){
        return (<Switch>
            < Route path='/register' render={ () => {
                return(
                    <div>
                        {this.props.loader ? <Loader /> : this.renderRegister()}
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
            loader: state.loader,
            loggedInUser: state.loggedInUser
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            register: (userObj, history) => {
                dispatch(register(userObj, history))
            }
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)