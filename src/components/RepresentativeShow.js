import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import CongressConnectedStateTile from './CongressConnectedStateTile'
import { fetchHouseReps, fetchShowHouseRep, fetchCompareHouseReps , removeCompareHouseReps} from '../actions'
import Loader from './Loader';
import republican from '../republican.svg'
import democrat from '../democrat.svg'
import flag from '../true-color-flag.svg'

class RepresentativeShow extends React.Component {
    componentDidMount(){
        this.props.fetchShowHouseRep(this.props.match.params.representativeId)
    }

    renderHouseCommittees = () => {

        return this.props.representative.house_committees.map (committee => {
            let subcommittees = committee.subcommittees.split(';')
            return (
            <>
                <hr width='25%'/>
                <h4>Committee Leadership</h4>
                <h5>{committee.name} :: Chair</h5>
                <a href={`${committee.url}`}target={'_blank'} >Visit the {committee.name} website</a>
                <h5>Subcommittees:</h5>
                { subcommittees.map (subcomm => <p> <img src={flag} height='2%' width='2%'/> {subcomm}</p>)}
                 <hr width='25%'/>
            </>
        )})
    }

    renderJointCommittees = () => {
        return this.props.representative.joint_committees.map (committee => {
            let subcommittees = committee.subcommittees.split(';')
            return (
                <>
                <hr width='25%'/>
                <h4>Committee Leadership</h4>
                <h5>{committee.name} :: Chair</h5>
                <a href={`${committee.url}`}target={'_blank'} >Visit the {committee.name} website</a>
                <h5>Subcommittees:</h5>
                { subcommittees.map (subcomm => <p> <img src={flag} height='2%' width='2%'/> {subcomm}</p>)}
                 <hr width='25%'/>
            </>
        )})
    }

    handleAddComparison = (e) => {
        e.preventDefault();
        this.props.fetchCompareHouseReps(this.props.representative.id, localStorage.getItem('user'))
    }

    renderCompareBtn = () => {
        if (this.props.compareRepresentatives.filter(rep => rep.id == this.props.representative.id).length > 0) {
            return(<>
            <hr width='25%'/>
            <br/>
            <button className='compare-btn' onClick={(e)=> this.handleRemoveComparison(e)}>Remove This Comparison</button>
            </>)
        } else {
            return (
            <>
            <hr width='25%'/>
            <br/>
            <button className='compare-btn' onClick={(e)=> this.handleAddComparison(e)}>Compare {this.props.representative.name} with their colleagues</button></>)
        }
    }

    handleRemoveComparison = (e) => {
        e.preventDefault();
        this.props.removeCompareHouseReps(this.props.representative.id)
    }

    renderPartyIcon = () => {
        if (this.props.representative.party == 'D'){
            return (<img className='party' src={democrat} />)
        } else if (this.props.representative.party == 'R'){
            return (<img className='party' src={republican} />)
        } else if (this.props.representative.party =='ID'){
            return (<img className='party' src={flag} />)
        }
    }

    renderParty = () => {
        if (this.props.representative.party == 'D'){
            return (<h5>Democrat</h5>)
        } else if (this.props.representative.party == 'R'){
            return (<h5>Republican</h5>)
        } else if (this.props.representative.party =='ID'){
            return (<h5>Independent</h5>)
        }
    }
    
    renderRepresentative = () => {
        return(
            <div className='representative-card'>
                {this.renderPartyIcon()}
                <h3>{this.props.representative.name}</h3>
                {this.renderParty()}
                <h4>Chamber of Congress:{this.props.representative.chamber}</h4>
                <h4>Role: {this.props.representative.role}</h4>
                <h4>Gender: {this.props.representative.gender}</h4>
                <hr width='25%'/>
                {this.props.displayState ? <CongressConnectedStateTile state={this.props.displayState} /> : <Loader />}
                <h5>District: {this.props.representative.district}</h5>
                <h5>Next Election: {this.props.representative.next_election}</h5>
                <h5>Term Length: 2 years</h5>
                <hr width='25%'/>
                <h4>Social Media Contact:</h4>
                <p>Twitter Handle: <a href={`https://twitter.com/${this.props.representative.twitter_id}`} target={'_blank'}>@{this.props.representative.twitter_id}</a></p>
                <p>Facebook: <a href={`https://www.facebook.com/${this.props.representative.facebook_account}`} target={'_blank'}>{this.props.representative.facebook_account}</a></p>
                {this.props.representative.house_committees ? this.renderHouseCommittees() : null}
                {this.props.representative.joint_committees ? this.renderJointCommittees() : null}
                {this.props.loggedInUser.username ? this.renderCompareBtn() : null }
                <em>Details provided thanks to ProPublica's Congress API.</em>
            </div>
        )
    }
    render(){
        return(
            <Switch>
            <Route path='/representatives/:representativeID'>
                    {this.props.loader ? <Loader/> : this.renderRepresentative()}
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
        loggedInUser: state.loggedInUser,
        compareRepresentatives: state.compareRepresentatives
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
        },
        removeCompareHouseReps: (id) => {
            dispatch(removeCompareHouseReps(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepresentativeShow)