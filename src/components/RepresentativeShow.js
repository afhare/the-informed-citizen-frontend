import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import StateTile from './StateTile'
import { fetchHouseReps, fetchShowHouseRep, fetchCompareHouseReps } from '../actions'

class RepresentativeShow extends React.Component {
    componentDidMount(){
        this.props.fetchShowHouseRep(this.props.match.params.representativeId)
    }

    renderHouseCommittees = () => {

        return this.props.representative.house_committees.map (committee => {
            let subcommittees = committee.subcommittees.split(';')
            return (
            <>
                <p>Committee: {committee.name}</p>
                <p>Committee Chair</p>
                <a href={`${committee.url}`}target={'_blank'} >Visit the {committee.name} website</a>
                <p>Subcommittees:</p>
                { subcommittees.map (subcomm => <p> <span role='img'>🇺🇸</span> - {subcomm}</p>)}
            </>
        )})
    }

    renderJointCommittees = () => {
        return this.props.representative.joint_committees.map (committee => {
            let subcommittees = committee.subcommittees.split(';')
            return (
            <>
                <p>Committee: {committee.name}</p>
                <p>Committee Chair</p>
                <a href={`${committee.url}`}target={'_blank'} >Visit the {committee.name} website</a>
                <p>Subcommittees:</p>
                { subcommittees.map (subcomm => <p> 🇺🇸 - {subcomm}</p>)}
            </>
        )})
    }

    handleAddComparison = (e) => {
        e.preventDefault();
        this.props.fetchCompareHouseReps(this.props.representative.id, localStorage.getItem('user'))
    }
    
    renderRepresentative = () => {
        return(
            <div className='representative-card'>
                <p>Name: {this.props.representative.name}</p>
                <p>Party Affiliation: {this.props.representative.party}</p>
                <p>Chamber of Congress:{this.props.representative.chamber}</p>
                <p>Role: {this.props.representative.role}</p>
                <hr width='35%'/>
                <p>District: {this.props.representative.district}</p>
                <p>Twitter Handle: <a href={`https://twitter.com/${this.props.representative.twitter_id}`} target={'_blank'}>@{this.props.representative.twitter_id}</a></p>
                <p>Facebook: <a href={`https://www.facebook.com/${this.props.representative.facebook_account}`} target={'_blank'}>{this.props.representative.facebook_account}</a></p>
                <p>Gender: {this.props.representative.gender}</p>
                <p>Next Election: {this.props.representative.next_election}</p>
                <p>Term Length: 2 years</p>
                {this.props.displayState ? <StateTile state={this.props.displayState} /> : <div>State details loading...</div>}
                {this.props.representative.house_committees ? this.renderHouseCommittees() : null}
                {this.props.representative.joint_committees ? this.renderJointCommittees() : null}
                <button onClick={(e)=> this.handleAddComparison(e)}>Compare {this.props.representative.name} with their colleagues</button>
            </div>
        )
    }
    render(){
        return(
            <Switch>
            <Route path='/representatives/:representativeID'>
                    {this.props.loader ? <div>Loading, please wait ...</div> : this.renderRepresentative()}
            </Route>
        </Switch>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loader: state.loader,
        representative: state.showHouseRep,
        representatives: state.representatives,
        displayState: state.showHouseRep.state,
        loggedInUser: state.loggedInUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchHouseReps: () => {
            dispatch(fetchHouseReps())
        },
        fetchShowHouseRep: (id) => {
            dispatch(fetchShowHouseRep(id))
        },
        fetchCompareHouseReps: (id, token) => {
            dispatch(fetchCompareHouseReps(id, token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepresentativeShow)