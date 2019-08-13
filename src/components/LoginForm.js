import React from 'react';
import { connect } from 'react-redux'

class LoginForm extends React.Component {
    render(){
        return(
            <div className='login-form'>
                <form>
                    <h3>Username: </h3> <input type="text" placeholder="Enter username here" name="username" value="" />
                    <h3>Password: </h3> <input type="password" placeholder="Enter password here" name="password" value="" />
                    <input type='submit'/>
                </form>
            </div>
        )
    }
}

// export default connect()(LoginForm)
export default LoginForm