import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';

class LoginContainer extends React.Component {
    componentDidMount(){
        console.log(this.props)
    };

    constructor(props){
        super(props)
        this.state={
        }
    }

    renderLogin = () => {
        return (
            <div>
               <LoginForm />
            </div>
        )
    }

    render(){
        return (<Switch>
            < Route path='/login' render={ () => {
                return(
                    <div>
                        {this.props.loader ? <div>Loading, please wait ...</div> : this.renderLogin()}
                    </div>
                )
            }}
            />
        </Switch>
        )
    }

    // const mapStateToProps = (state) => {
    //     return {
    //         loader: state.loader
    //     }
    // }

    // const mapDispatchToProps = (dispatch) => {
    //     return {
    //     }
    // }
}

// export default connect()(LoginContainer)
export default LoginContainer