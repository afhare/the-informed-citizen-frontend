import React from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import congress  from '../congress.svg'
import {logout, verifyLogin} from '../actions'

class NavBar extends React.Component {
    renderShowLogout = () => {
        return (
            <>
                <Link to={`/compare`} className="nav-link">Compare Members of Congress</Link>  ||
                <Link to={`/profile`} className="nav-link">Profile Page</Link>  ||
                <Link to={`/update-user-profile`} className="nav-link">Update Your Profile</Link>  ||
                <a href='/' onClick={() => this.handleLogout()}>Log out</a>  ||
            </>
        )
    }

    handleLogout = () => {
        localStorage.removeItem('user')
        this.props.logout(this.props.history)
    }
    
    render(){
        return(
            <nav className='navbar'>
                <img className='logo' src={congress} alt='small Congress icon' />
                <Link to={'/'} className="nav-link">Home</Link>  ||  
                <Link to={'/congress'} className="nav-link">View Congressional Representatives</Link>  ||  
                <Link to={'/states'} className="nav-link">View States</Link>  ||
                { this.props.loggedInUser.username ? this.renderShowLogout() : 
                    <>
                        <Link to={'/login'} className="nav-link">Login</Link>   ||
                        <Link to={'/register'} className="nav-link">Register/Create an Account</Link>  ||
                    </> }
                <Link to={'/address-search'} className="nav-link">Find My Representatives</Link>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        loggedInUser: state.loggedInUser,
        loader: state.loader,
        compareReps: state.compareRepresentatives,
        compareSenators: state.compareSenators
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: ()=> {dispatch(logout)},
        verifyLogin: (token) => {
            dispatch(verifyLogin(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NavBar))