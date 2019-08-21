import React from 'react';
import { connect } from 'react-redux';
import UserMatchedRepresentative from './UserMatchedRepresentative';
import ReactDOM from 'react-dom';
import { fetchHouseReps, fetchSenators } from '../actions'
import reducer from '../reducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';


class AddressDisplay extends React.Component {

    componentDidMount(){
        if (this.props.representatives.length === 0) {
            this.props.fetchHouseReps()
        } else if (this.props.senators.length === 0) {
            this.props.fetchSenators()
        } else if (this.props.representatives.length === 0 && this.props.senators.length === 0){
            this.props.fetchHouseReps()
            this.props.fetchSenators()
        }
    }

    handleGoogleAPIRequest = () => {
        let street = `${this.props.displayAddress.street_address}`
        let reformattedStreet = street.split(' ').join('%20')
        let city = this.props.displayAddress.city
        let reformattedCity = city.split(' ').join('%20')
        let apiState = this.props.displayAddress.state


        let googleAPILink = `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCWTpEcxECWnmZjKKQN_IkoKZad2G8x740&address=${reformattedStreet}%20${reformattedCity}%20${apiState}`
        
        fetch(googleAPILink).then(response => response.json()).then(data => {
            let myRepresentatives = data.officials.slice(2,5)
            
            let formattedReps = myRepresentatives.map(official => {
                return {name: official.name, party: official.party, phones: official.phones, urls: official.urls}
            })
            this.displayRepresentatives(formattedReps)
        })

    }

    
    displayRepresentatives = (formattedRepresentatives) => {
        let matchedRepOne = this.props.senators.find(rep => rep.name.includes(formattedRepresentatives[0].name.split(' ').slice(-1)[0]))
        let matchedRepTwo = this.props.senators.find(rep => rep.name.includes(formattedRepresentatives[1].name.split(' ').slice(-1)[0]))
        let matchedRepThree = this.props.representatives.find(rep => rep.name.includes(formattedRepresentatives[2].name.split(' ').slice(-1)[0]))

        const composeEnhancers = 
            typeof window === 'object' && 
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose ;

        const enhancer = composeEnhancers(applyMiddleware(thunk))

        const store = createStore(reducer,  enhancer)

        ReactDOM.render(   
            <Provider store={store}>
                <BrowserRouter>
                    <UserMatchedRepresentative representative={formattedRepresentatives[0]} matchedRepresentative={matchedRepOne ? matchedRepOne : null}/>
                    <UserMatchedRepresentative representative={formattedRepresentatives[1]} matchedRepresentative={matchedRepTwo ? matchedRepTwo : null}/>
                    <UserMatchedRepresentative representative={formattedRepresentatives[2]} matchedRepresentative={matchedRepThree ? matchedRepThree : null}/>
                </BrowserRouter>
            </Provider>,
        document.getElementById('user-matched-congresspeople'));
    }

    
    addressFormat = () => {
        return(
            <div>
                <p>My provided address:</p>
                {this.props.displayAddress.street_address}
                <br/>
                {this.props.displayAddress.city}, {this.props.displayAddress.state}
                <br/>
                {this.props.displayAddress.zipcode}
                <hr width='25%' />
                <p>The senators and congressperson who represent me are: </p>
                {this.handleGoogleAPIRequest()}
                <div id='user-matched-congresspeople'>
                </div>
            </div>
        )
    }
    
    render(){
        return(
            <div className='matched-congress-container'>
                <p>As provided by Google's Civic Information API: </p>
                {this.props.displayAddress.submitted_form ? this.addressFormat() : <p>Upon submitting the form above, your corresponding senators and representatives will display below.</p>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.loggedInUser,
        representatives: state.representatives,
        senators: state.senators,
        loader: state.loader
        }
    }

const mapDispatchToProps = (dispatch) => {
        return {
            fetchHouseReps: () => {
                dispatch(fetchHouseReps())
            },
            fetchSenators: () => {
                dispatch(fetchSenators())
            }
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(AddressDisplay)