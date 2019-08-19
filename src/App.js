import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import CongressContainer from './containers/CongressContainer';
import StatesContainer from './containers/StatesContainer'
import SenatorShow from './components/SenatorShow';
import RepresentativeShow from './components/RepresentativeShow';
import StateShow from './components/StateShow'
import NavBar from './components/NavBar';
import Home from './components/Home';
import LoginContainer from './containers/LoginContainer';
import UserShow from './components/UserShow';
import AddressMatchContainer from './containers/AddressMatchContainer';
import { connect } from 'react-redux'
import { verifyLogin } from './actions'
import UpdateProfile from './components/UpdateProfile';

class App extends React.Component { 
  componentDidMount(){
    console.log('token', localStorage.getItem('user'), 'user', this.props.loggedInUser)
    if ( localStorage.getItem('user') && !this.props.loggedInUser.username) {
      this.props.verifyLogin(localStorage.getItem('user'))
    }
  }

  render(){
    return (
      <BrowserRouter>
        <NavBar/> 
        <div className='App'>
          <Switch>
            <Route exact path='/' component={Home}/>

            <Route exact path='/login' render={(routeProps) => { return <LoginContainer {...routeProps} />}} />

            <Route exact path='/congress' render={ routeProps => ( <CongressContainer {...routeProps} /> )}/>
            
            <Route exact path='/states' render={ routeProps => ( <StatesContainer {...routeProps}/> )}/>

            <Route exact path='/states/:stateID' render={ (routeProps) => (<StateShow {...routeProps}/>)}/>

            <Route exact path='/representatives/:representativeId' render={ (routeProps) => (<RepresentativeShow {...routeProps}/>)}/>
            
            <Route exact path='/senators/:senatorId' render={ (routeProps) => (<SenatorShow {...routeProps}/>)}/>

            <Route exact path='/address-search' render={ routeProps => (<AddressMatchContainer {...routeProps}/>)}/>

            <Route exact path='/profile' render={ routeProps => (<UserShow {...routeProps} user={this.props.loggedInUser}/>)}/>

            <Route exact path='/update-user-profile' render={ routeProps => (<UpdateProfile {...routeProps} user={this.props.loggedInUser}/>)}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.loggedInUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    verifyLogin: (token) => {
      dispatch(verifyLogin(token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
