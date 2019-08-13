import React from 'react';
import { connect } from 'react-redux'
import StateRepTile from './StateConnectedRepresentativeTile'
import StateSenatorTile from './StateConnectedSenatorTile'


class StateShow extends React.Component {
    componentDidMount(){
        console.log(this.props)
    }

    display2019Election = () => {
        let electionDates = this.props.showState.twenty_nineteen_election_date
        return (
            <div>
                <p>Remaining 2019 Election Date(s): {electionDates} </p>
                <p>Election Type and Scope: {this.props.showState.twenty_nineteen_election_type} Election : {this.props.showState.twenty_nineteen_election_scope} </p>
            </div>
        )
    }

    displayEarlyVotingDetails = () => {
        return (
            <div>
                <p>Yes, details below:</p>
                <h6>Early or In-Person Absentee Voting Begins: </h6> <p>{this.props.showState.early_or_in_person_absentee_voting_begins}</p>
                <h6>Early or In-Person Absentee Voting Ends: </h6> <p>{this.props.showState.early_or_in_person_absentee_voting_ends}</p>
            </div>
        )
    }

    displayHouseReps = () => {
        return this.props.showState.representatives.map( representative => <StateRepTile representative={representative}/>)
    }

    displaySenators = () => {
        return this.props.showState.senators.map(senator => <StateSenatorTile senator={senator}/>)
    }
    
    render(){
        return(
            <div className='state-card'>
                <h3>{this.props.showState.name}, {this.props.showState.abbreviation}</h3>
                <h4>Most recent election voter turnout:</h4> <p className={this.props.showState.voter_turnout > 50 ? 'voter-positive': 'voter-negative'}>{this.props.showState.voter_turnout}%</p>
                { this.props.showState.twenty_nineteen_election ? this.display2019Election() : null }
                <div className='2020-election-details'>
                    <h5>2020 Election Details:</h5>
                    <h6>Democratic {this.props.showState.dem_primary_type} Date:</h6> <p>{this.props.showState.twenty_twenty_democratic_primary_date}</p>
                    <h6>Republican {this.props.showState.rep_primary_type} Date:</h6> <p> {this.props.showState.twenty_twenty_republican_primary_date}</p>
                    <hr width='10%'/>
                    <h6>General Election Date: </h6> <p>{this.props.showState.twenty_twenty_general_election_date}</p>
                </div>
                <hr width='35%'/>
                <div className='voter-registration-details'>
                    <h5>{this.props.showState.name} : Voter Primer </h5>
                        <h6>What kind of voter ID is required? </h6> <p>{this.props.showState.id_required}</p>
                        <h6>Does {this.props.showState.name} allow early voting, or in-person absentee voting?</h6> {this.props.showState.early_or_in_person_absentee_voting ? this.displayEarlyVotingDetails() : <p>No</p>}
                        <h6>Does {this.props.showState.name} automatically register voters at the DMV? </h6> {this.props.showState.automatic_voter_registration ? <p>Yes.</p> : <p>No.</p>}
                        <h6>Does {this.props.showState.name} allow for same day voter registration? </h6> {this.props.showState.same_day_voter_registration ? <p>Yes.</p> : <p>No.</p>}
                        <h6>Does {this.props.showState.name} allow for online voter registration? </h6> {this.props.showState.online_voter_registration ? <p>Yes.</p> : <p>No.</p>}
                </div>
                <div className='congress-representation state-grid-container'>
                    {this.displayHouseReps()}
                    {this.displaySenators()}
                </div>
            </div>
        )
    }
}

// export default connect()(StateShow)
export default StateShow


