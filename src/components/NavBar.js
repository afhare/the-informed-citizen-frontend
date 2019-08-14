import React from 'react';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import congress  from '../congress.svg'

class NavBar extends React.Component {
    renderLogout = () => {
        //if logged in - the link should display as "log out"
        return (
            <>
                <Link to={`/users/${this.props.user.id}`} className="nav-link"> Profile Page </Link>  ||
                <a onClick={() => { this.props.history.push('/login')}}>Log out</a>
            </>
        )
    }
    
    render(){
        return(
            <nav className='navbar'>
                <img className='logo' src={congress} alt='small Congress icon' />
                <Link to={'/'} className="nav-link"> Home </Link>  ||  
                <Link to={'/congress'} className="nav-link"> View Congressional Representatives </Link>  ||  
                <Link to={'/states'} className="nav-link"> View States </Link>  ||
                { localStorage.getItem("user") ? this.renderLogout() : <Link to={'/login'} className="nav-link"> Login </Link>}  ||
                <Link to={'/users/3'} className="nav-link"> Profile Page </Link>  ||
                <Link to={'/address-search'} className="nav-link"> Find My Representatives </Link>
            </nav>
        )
    }
}

// export default connect()(NavBar)
export default withRouter(NavBar)