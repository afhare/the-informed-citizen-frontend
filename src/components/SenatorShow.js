import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import CongressConnectedStateTile from './CongressConnectedStateTile'
import { fetchSenators, fetchShowSenator, fetchCompareSenators, removeCompareSenators} from '../actions'
import Loader from './Loader';
import republican from '../republican.svg'
import democrat from '../democrat.svg'
import flag from '../true-color-flag.svg'

class SenatorShow extends React.Component {

    componentDidMount(){
        this.props.fetchShowSenator(this.props.match.params.senatorId)
    }

    renderSenateCommittees = () => {

        return this.props.senator.senate_committees.map (committee => {
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

    renderPartyIcon = () => {
        if (this.props.senator.party == 'D'){
            return (<img className='party' src={democrat} />)
        } else if (this.props.senator.party == 'R'){
            return (<img className='party' src={republican} />)
        } else if (this.props.senator.party =='ID'){
            return (<img className='party' src={flag}/>)
        }
    }

    renderParty = () => {
        if (this.props.senator.party == 'D'){
            return (<h5>Democrat</h5>)
        } else if (this.props.senator.party == 'R'){
            return (<h5>Republican</h5>)
        } else if (this.props.senator.party =='ID'){
            return (<h5>Independent</h5>)
        }
    }

    renderCompareBtn = () => {
        if (this.props.compareSenators.filter(sen => sen.id == this.props.senator.id).length > 0) {
            return(
                <>
                <hr width='25%'/>
                <br/>
            <button className='compare-btn' onClick={(e)=> this.handleRemoveComparison(e)}>Remove This Comparison</button></>)
        } else {
            return (<>
                <hr width='25%'/>
                <br/>
                <button className='compare-btn' onClick={(e)=> this.handleAddComparison(e)}>Compare {this.props.senator.name} with their colleagues</button></>)
        }
    }

    handleAddComparison = (e) => {
        e.preventDefault();
        this.props.fetchCompareSenators(this.props.senator.id, localStorage.getItem('user'))
    }


    handleRemoveComparison = (e) => {
        e.preventDefault();
        this.props.removeCompareSenators(this.props.senator.id)
    }

    renderSenator = () => {
        return(
            <div className='senator-card'>
                {this.renderPartyIcon()}
                <h4>{this.props.senator.name}</h4>
                {this.renderParty()}
                <h4>Chamber of Congress:{this.props.senator.chamber}</h4>
                <h4>Role: {this.props.senator.role}</h4>
                <h4>Gender: {this.props.senator.gender}</h4>
                <hr width='25%'/>
                {this.props.displayState ? <CongressConnectedStateTile state={this.props.displayState} /> : <Loader />}
                <h5>Next Election: {this.props.senator.next_election}</h5>
                <h5>Term Length: 6 years</h5>
                <hr width='25%'/>
                <h4>Social Media Contact:</h4>
                <p>Twitter Handle: <a href={`https://twitter.com/${this.props.senator.twitter_id}`} target={'_blank'}>@{this.props.senator.twitter_id}</a></p>
                <p>Facebook: <a href={`https://www.facebook.com/${this.props.senator.facebook_account}`} target={'_blank'}>{this.props.senator.facebook_account}</a></p>
                {this.props.senator.senate_committees ? this.renderSenateCommittees() : null}
                {this.props.loggedInUser.username ? this.renderCompareBtn() : null }
                <em>Details provided thanks to ProPublica's Congress API.</em>
            </div>
        )
    }

    render(){
        return(
            <Switch>
               <Route path='/senators/:senatorID'>
                    {this.props.loader ? <Loader/> : this.renderSenator()}
               </Route>
           </Switch>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loader: state.loader,
        senator: state.showSenator,
        senators: state.senators,
        displayState: state.showSenator.state,
        loggedInUser: state.loggedInUser,
        compareSenators: state.compareSenators
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSenators: () => {
            dispatch(fetchSenators())
        },
        fetchShowSenator: (id) => {
            dispatch(fetchShowSenator(id))
        },
        fetchCompareSenators: (id, token) => {
            dispatch(fetchCompareSenators(id, token))
        },
        removeCompareSenators: (id) => {
            dispatch(removeCompareSenators(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SenatorShow)