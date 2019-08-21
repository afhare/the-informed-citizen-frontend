import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions'
import Loader  from '../components/Loader';


class RegisterContainer extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            name:'',
            street_address:'',
            city:'',
            user_state:'',
            zipcode:''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.register({user: this.state}, this.props.history)
        this.setState({
            username: '',
            password: '',
            name:'',
            street_address:'',
            city:'',
            user_state:'',
            zipcode:''
        })
    }

    renderRegister = () => {
        const quotes =['Let us never forget that government is ourselves and not an alien power over us. The ultimate rulers of our democracy are not a President and senators and congressmen and government officials, but the voters of this country. -Franklin D. Roosevelt', 'Patriotism is supporting your country all the time, and your government when it deserves it. -Mark Twain', 'We the People of the United States, in Order to form a more perfect Union, establish Justice, insure domestic Tranquility, provide for the common defence, promote the general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution for the United States of America.']
        return (
            <div className='register-form'>
                <h3>Create an account on The Informed Citizen</h3>
                <p>{quotes[Math.floor(Math.random()*quotes.length)]}</p>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label>Username: </label> 
                        <input type="text" name="username" value={this.state.username} onChange={(e)=> this.handleChange(e)} placeholder="Enter username here"/>
                        <br />
                    <label>Password: </label> 
                        <input type="password" name="password" value={this.state.password} onChange={(e)=> this.handleChange(e)} placeholder="Enter password here"/>
                        <br />
                    <label>Name: </label> 
                        <input type="text" name="name" value={this.state.name} onChange={(e)=> this.handleChange(e)} placeholder="Enter your name here"/>
                        <br />
                    <label>Street Address: </label>
                        <input type='text' name='street_address' value={this.state.street_address} onChange={(e)=> this.handleChange(e)} placeholder='Ex: 123 Main Street' />
                        <br />
                    <label>City: </label>
                        <input type='text' name='city' value={this.state.city} onChange={(e)=> this.handleChange(e)} placeholder='Ex: Binghamton, Kansas City' />
                        <br />
                    <label>Two-Letter State Abbreviation: </label>
                        <input type='text' name='user_state' value={this.state.user_state} onChange={(e)=> this.handleChange(e)} placeholder='Ex: AL, CA, OH' />
                        <br />
                    <label>Zip Code: </label>
                        <input type='text' name='zipcode' value={this.state.zipcode} onChange={(e)=> this.handleChange(e)} placeholder='Ex: 12345, 45678' />
                    <br />
                    <input type='submit'/>
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