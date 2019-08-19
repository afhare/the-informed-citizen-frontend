import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions'
import Loader  from '../components/Loader';


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
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <h3>Username: </h3> <input type="text" placeholder="Enter username here" name="username" value={this.state.username} onChange={(e)=> this.handleChange(e)}/>
                    <h3>Password: </h3> <input type="password" placeholder="Enter password here" name="password" value={this.state.password} onChange={(e)=> this.handleChange(e)}/>
                    <br />
                    <input type='submit'/>
                </form>
            </div>
        )
    }

    render(){
        return (<Switch>
            < Route path='/login' render={ () => {
                return(
                    <div>
                        {this.props.loader ? <div>Loading, please wait ...<Loader /></div> : this.renderLogin()}
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