import React from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
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
import API from './services/api'

class App extends React.Component { 

  constructor(props){
    super(props);
    this.state={
      senators:[],
      representatives:[],
      unitedStates:[],
      users:[],
    }
  }
  componentDidMount(){
    API.getHouse().then(data => {this.setState({representatives: data})})
    API.getSenators().then(data => {this.setState({senators: data})})
    API.getStates().then(data => {this.setState({unitedStates: data})})
    API.getUsers().then(data => {this.setState({users: data})})
  }

  //add a handle logout route to navbar

  render(){
    return (
      <BrowserRouter>
        <NavBar/> 
        <div className='App'>
          <Switch>
            <Route exact path='/' component={Home}/>

            <Route exact path='/login' render={(routeProps) => { return <LoginContainer {...routeProps} />}} />

            <Route exact path='/congress' render={ routeProps => ( <CongressContainer {...routeProps} senators={this.state.senators} representatives={this.state.representatives}/> )}/>
            
            <Route exact path='/states' render={ routeProps => ( <StatesContainer {...routeProps} states={this.state.unitedStates}/> )}/>
            
            <Route exact path='/address-search' render={ routeProps => (<AddressMatchContainer {...routeProps}/>)}/>
            
            <Route exact path='/states/:stateID' render={
                (route) => {
                    const id = route.match.params.stateID
                    const showState = this.state.unitedStates.find(stateObj => stateObj.id == id)
                    return (
                        <div>
                            <StateShow showState={showState}/>
                        </div>
                    )}
            }/>
            
            <Route exact path='/representatives/:representativeId' render={
                (route) => {
                    const id = route.match.params.representativeId
                    const representative = this.state.representatives.find(rep => rep.id == id)
                    return (
                        <div>
                            <RepresentativeShow representative={representative}/>
                        </div>
                    )}
            } />

            <Route exact path='/senators/:senatorId' 
              render={
                  (route) => {
                    const id = route.match.params.senatorId
                    const senator = this.state.senators.find(senator => senator.id == id)
                      return (
                          <div>
                              <SenatorShow senator={senator}/>
                          </div>
                      )}
              } 
            />

          <Route exact path='/users/:userId' 
              render={
                  (route) => {
                    const id = route.match.params.userId
                    const user = this.state.users.find(user => user.id == id)
                      return (
                          <div>
                              <UserShow user={user}/>
                          </div>
                      )}
              } 
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
