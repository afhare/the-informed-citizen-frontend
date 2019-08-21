import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions'
import Loader  from '../components/Loader';
import flag  from '../true-color-flag.svg'


class LoginContainer extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            error: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        let username = this.state.username
        let password = this.state.password
        e.preventDefault();
        this.props.login(username, password, this.props.history)
        this.setState({
            username: '',
            password: ''
        })
    }

    renderLogin = () => {
        return (
            <div className='login-form'>
                <img className='register-logo' src={flag} alt='Dome of Congress Building' />
                <h3>Login to your account on The Informed Citizen</h3>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <p className='login-input'>Username: <input type="text" placeholder="Enter username here" name="username" value={this.state.username} onChange={(e)=> this.handleChange(e)}/></p>
                    <p className='login-input'>Password: <input type="password" placeholder="Enter password here" name="password" value={this.state.password} onChange={(e)=> this.handleChange(e)}/></p>
                    <br />
                    <input className='submit-btn' type='submit'/>
                </form>
            </div>
        )
    }

    render(){
        return (<Switch>
            < Route path='/login' render={ () => {
                return(
                    <div>
                        {this.props.loader ? <Loader /> : this.renderLogin()}
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
            login: (username, password, history) => {
                dispatch(login(username, password, history))
            }
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)