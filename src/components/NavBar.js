import React from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import congress  from '../congress.svg'
import {logout, verifyLogin} from '../actions'
import republican from '../republican.svg'
import democrat from '../democrat.svg'
import flag from '../true-color-flag.svg'

class NavBar extends React.Component {
    
    constructor(props){
        super(props)
        this.state={
            clicked:false
        }
    }

    showDropDown = () => {
        const compareMenu = document.getElementsByClassName('dropdown-content')[0]
        const accountMenu = document.getElementsByClassName('dropdown-content')[1]
        const logos = document.getElementsByClassName('micro-logo')[0]
        if (compareMenu.style.display == 'none'){
            compareMenu.style.display = 'block'
            accountMenu.style.display = 'block'
            logos.style.display = 'none'
            this.setState({clicked: true})
        } else {
            compareMenu.style.display = 'none'
            accountMenu.style.display = 'none'
            logos.style.display = 'inline-flex'
            this.setState({clicked: false})
        }
    }
    
    renderShowLogout = () => {
        return (
            <>
                <li className='dropdown' onClick={(e)=>this.showDropDown()}>{this.state.clicked ? 'Hide My Account Access' : 'Show My Account Access'}</li>
                <div className='dropdown-content'>
                    <li><Link to={`/profile`} className="nav-link">Profile Page</Link></li>
                    <li><Link to={`/update-user-profile`} className="nav-link">Update Profile</Link></li>
                </div>
                <div className='dropdown-content'>
                    <li><Link to={`/compare`} className="nav-link">View Congress Comparisons</Link></li>
                    <li><a href='/' onClick={() => this.handleLogout()}>Log out</a></li>
                </div>
            </>
        )
    }

    handleLogout = () => {
        localStorage.removeItem('user')
        this.props.logout(this.props.history)
    }
    
    render(){
        return(<>
                <img className='logo' src={congress} alt='Dome of Congress Building' />
                <h1 className='title'>The Informed Citizen</h1>
            <div className='navbar'>
                <ul className='nav-list'>
                    <li><Link to={'/'} className="nav-link">Home</Link></li>
                    <li><Link to={'/congress'} className="nav-link">View Congressional Representatives</Link></li>
                    <li><Link to={'/states'} className="nav-link">View States</Link></li>
                    { this.props.loggedInUser.username ? this.renderShowLogout() : 
                        <>
                            <li><Link to={'/login'} className="nav-link">Login</Link></li>
                            <li><Link to={'/register'} className="nav-link">Register/Create an Account</Link></li>
                        </> }
                    <li><Link to={'/address-search'} className="nav-link">Find My Representatives</Link></li>
                </ul>
            <br/>
                <div className='micro-logo'>
                    <img className='logo' src={democrat} alt='Dome of Congress Building' />
                    <img className='logo' src={flag} alt='Dome of Congress Building' />
                    <img className='logo' src={republican} alt='Dome of Congress Building' />
                </div>
            </div>
            </>
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