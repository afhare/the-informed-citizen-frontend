import React from 'react';
import { connect } from 'react-redux';
import UserMatchedRepresentative from './UserMatchedRepresentative';
import ReactDOM from 'react-dom';
import { fetchHouseReps, fetchSenators } from '../actions'

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
        console.log(formattedRepresentatives)
        ReactDOM.render(   
            <>
            <UserMatchedRepresentative representative={formattedRepresentatives[0]} />
            <UserMatchedRepresentative representative={formattedRepresentatives[1]} />
            <UserMatchedRepresentative representative={formattedRepresentatives[2]} />
            </>,
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
            <div>
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