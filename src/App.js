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

class App extends React.Component { 

  constructor(props){
    super(props);
    this.state={
      senators:[],
      representatives:[],
      unitedStates:[],
      users:[]
    }
  }
  componentDidMount(){
    this.getHouse();
    this.getSenators();
    this.getStates();
    this.getUsers();
  }

  getHouse = () => {
    fetch('http://localhost:3001/representatives').then(response => response.json()).then(data => {
            this.setState({representatives: data})
        })
  }

  getSenators = () => {
    fetch('http://localhost:3001/senators').then(response => response.json()).then(data => {
            this.setState({senators: data})
        })
  }

  getStates = () => {
    fetch('http://localhost:3001/states').then(response => response.json()).then(data => {
            this.setState({unitedStates: data})
        })
  }

  getUsers = () => {
    fetch('http://localhost:3001/users').then(response => response.json()).then(data => {
            this.setState({users: data})
        })
  }

  render(){
    return (
      <BrowserRouter>
        <NavBar />
        <div className='App'>
          <Switch>
            <Route exact path='/' component={Home}/>

            <Route exact path='/login' component={LoginContainer}/>

            <Route exact path='/congress' render={ routeProps => ( <CongressContainer {...routeProps} senators={this.state.senators} representatives={this.state.representatives}/> )}/>
            
            <Route exact path='/states' render={ routeProps => ( <StatesContainer {...routeProps} states={this.state.unitedStates}/> )}/>
            
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
