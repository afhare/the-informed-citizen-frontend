import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import CongressContainer from './containers/CongressContainer';

class App extends React.Component { 

  constructor(props){
    super(props);
    this.state={
      senators:[],
      representatives:[]
    }
  }
  componentDidMount(){
    this.getHouse();
    this.getSenators();
  }

  getHouse = () => {
    fetch('http://localhost:3001/representatives').then(response => response.json()).then(data => {
            console.log(data)
            this.setState({representatives: data})
        })
  }

  getSenators = () => {
    fetch('http://localhost:3001/senators').then(response => response.json()).then(data => {
            console.log(data)
            this.setState({senators: data})
        })
  }

  render(){
    return (
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <Route path='/' render={ routeProps => ( <CongressContainer {...routeProps} senators={this.state.senators} representatives={this.state.representatives}/> )}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
