import React from 'react';
import { connect } from 'react-redux';
import UserMatchedRepresentative from './UserMatchedRepresentative';
import { fetchHouseReps, fetchSenators } from '../actions'

class AddressDisplay extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            formattedRep0: null,
            matchedRep0: null,
            formattedRep1: null,
            matchedRep1: null,
            formattedRep2: null,
            matchedRep2: null
        }
    }

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
            
            let formattedRepresentatives = myRepresentatives.map(official => {
                return {name: official.name, party: official.party, phones: official.phones, urls: official.urls}
            })
            this.displayRepresentatives(formattedRepresentatives)
        })

    }

    
    displayRepresentatives = (formattedRepresentatives) => {
        let matchedRepZero = this.props.senators.find(rep => {
            if (rep.name.includes(formattedRepresentatives[0].name.split(' ').slice(-1)[0])){
                return rep
            }})
        let matchedRepOne = this.props.senators.find(rep => {
            if (rep.name.includes(formattedRepresentatives[1].name.split(' ').slice(-1)[0])){
                return rep
            }})
        let matchedRepTwo = this.props.representatives.find(rep => {
            if (rep.name.includes(formattedRepresentatives[2].name.split(' ').slice(-1)[0])){
                return rep
            }})
        this.setState({
            formattedRep0: formattedRepresentatives[0],
            matchedRep0: matchedRepZero,
            formattedRep1: formattedRepresentatives[1],
            matchedRep1: matchedRepOne,
            formattedRep2: formattedRepresentatives[2],
            matchedRep2: matchedRepTwo
        })
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
                <div className='user-matched-congresspeople'>
                    <UserMatchedRepresentative representative={this.state.formattedRep0} matchedRepresentative={this.state.matchedRep0 ? this.state.matchedRep0 : null} state={this.props.displayAddress.state}/>
                    <UserMatchedRepresentative representative={this.state.formattedRep1} matchedRepresentative={this.state.matchedRep1 ? this.state.matchedRep1 : null} state={this.props.displayAddress.state}/>
                    <UserMatchedRepresentative representative={this.state.formattedRep2} matchedRepresentative={this.state.matchedRep2 ? this.state.matchedRep2 : null} state={this.props.displayAddress.state}/>
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