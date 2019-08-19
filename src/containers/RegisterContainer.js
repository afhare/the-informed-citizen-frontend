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
        return (
            <div className='login-form'>
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
                        {this.props.loader ? <div>Loading, please wait ...<Loader /></div> : this.renderRegister()}
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