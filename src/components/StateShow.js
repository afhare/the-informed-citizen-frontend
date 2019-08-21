import React from 'react';
import { connect } from 'react-redux'
import StateRepTile from './StateConnectedRepresentativeTile'
import StateSenatorTile from './StateConnectedSenatorTile'
import { fetchShowState } from '../actions'
import { Route, Switch } from 'react-router-dom';
import Loader from './Loader';


class StateShow extends React.Component {
    componentDidMount(){
        this.props.fetchShowState(this.props.match.params.stateID)
    }

    display2019Election = () => {
        let electionDates = this.props.showState.twenty_nineteen_election_date
        return (
            <div>
                <p>Remaining 2019 Election Date(s): {electionDates} </p>
                <p>Election Type and Scope: {this.props.showState.twenty_nineteen_election_type} Election : {this.props.showState.twenty_nineteen_election_scope} </p>
                <hr width='25%'/>
            </div>
        )
    }

    displayEarlyVotingDetails = () => {
        return (
            <div>
                <p className='voter-positive'>Yes, details below:</p>
                <h4>Early or In-Person Absentee Voting Begins: </h4> <p className='voter-positive'>{this.props.showState.early_or_in_person_absentee_voting_begins}</p>
                <h4>Early or In-Person Absentee Voting Ends: </h4> <p className='voter-positive'>{this.props.showState.early_or_in_person_absentee_voting_ends}</p>
            </div>
        )
    }

    displayHouseReps = () => {
        return this.props.showState.representatives.map( representative => <StateRepTile representative={representative}/>)
    }

    displaySenators = () => {
        return this.props.showState.senators.map(senator => <StateSenatorTile senator={senator}/>)
    }

    renderShowState = () => {
        return(
            <div className='state-card'>
                <h1>{this.props.showState.name}, {this.props.showState.abbreviation}</h1>
                <hr width='25%'/>
                <h2>Most recent election voter turnout:</h2> <p className={this.props.showState.voter_turnout > 50 ? 'voter-positive': 'voter-negative'}>{this.props.showState.voter_turnout}%</p>
                { this.props.showState.twenty_nineteen_election ? this.display2019Election() : null }
                <div className='2020-election-details'>
                    <h3>2020 Election Details:</h3>
                    <h4>Democratic {this.props.showState.dem_primary_type} Date:</h4> <p>{this.props.showState.twenty_twenty_democratic_primary_date}</p>
                    <h4>Republican {this.props.showState.rep_primary_type} Date:</h4> <p> {this.props.showState.twenty_twenty_republican_primary_date}</p>
                    <h4>General Election Date: </h4> <h6>{this.props.showState.twenty_twenty_general_election_date}</h6>
                </div>
                <hr width='25%'/>
                <div className='voter-registration-details'>
                    <h2>{this.props.showState.name} : Voter Primer </h2>
                        <h3>What kind of voter ID is required? </h3> <p className={this.props.showState.id_required == 'None' ? 'voter-positive': 'voter-negative'}>{this.props.showState.id_required}</p>
                        <hr width='25%'/>
                        <h3>Does {this.props.showState.name} allow early voting, or in-person absentee voting?</h3> {this.props.showState.early_or_in_person_absentee_voting ? this.displayEarlyVotingDetails() : <p className='voter-negative'>No</p>}
                        <hr width='25%'/>
                        <h3>Does {this.props.showState.name} automatically register voters at the DMV? </h3> {this.props.showState.automatic_voter_registration ? <p className='voter-positive'>Yes.</p> : <p className='voter-negative'>No.</p>}
                        <hr width='25%'/>
                        <h3>Does {this.props.showState.name} allow for same day voter registration? </h3> {this.props.showState.same_day_voter_registration ? <p className='voter-positive'>Yes.</p> : <p className='voter-negative'>No.</p>}
                        <hr width='25%'/>
                        <h3>Does {this.props.showState.name} allow for online voter registration? </h3> {this.props.showState.online_voter_registration ? <p className='voter-positive'>Yes.</p> : <p className='voter-negative'>No.</p>}
                </div>
                <hr width='25%'/>
                <div className='congress-representation'>
                    {this.props.showState.representatives ? this.displayHouseReps() : null}
                    {this.props.showState.senators ? this.displaySenators() : null}
                </div>
            </div>
        )
    }
    
    render(){
        return(
           <Switch>
               <Route path='/states/:stateID'>
                    {this.props.loader ? <Loader/> : this.renderShowState()}
               </Route>
           </Switch>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loader: state.loader,
        showState: state.showState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchShowState: (id) => {
            dispatch(fetchShowState(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StateShow)




