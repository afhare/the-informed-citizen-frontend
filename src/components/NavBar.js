import React from 'react';
import { connect } from 'react-redux'
import { Link, Route, Switch } from 'react-router-dom'
import CongressContainer from '../containers/CongressContainer';

class NavBar extends React.Component {
    render(){
        return(
            <nav className='navbar'>
                <Link to={'/'} className="nav-link"> Home </Link>
                <Link to={'/congress'} className="nav-link"> View Congressional Representatives </Link>
                <Link to={'/states'} className="nav-link"> View States </Link>
                <Link to={'/login'} className="nav-link"> Login </Link>
                <Link to={'/users/4'} className="nav-link"> Profile Page </Link>
            </nav>
        )
    }
}
//if logged in - the link should display as "log out"
// export default connect()(NavBar)
export default NavBar