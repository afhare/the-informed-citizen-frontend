import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import CongressConnectedStateTile from './CongressConnectedStateTile'
import { fetchSenators, fetchShowSenator, fetchCompareSenators, removeCompareSenators} from '../actions'
import Loader from './Loader';

class SenatorShow extends React.Component {

    componentDidMount(){
        this.props.fetchShowSenator(this.props.match.params.senatorId)
    }

    renderSenateCommittees = () => {

        return this.props.senator.senate_committees.map (committee => {
            let subcommittees = committee.subcommittees.split(';')
            return (
            <>
                <p>Committee: {committee.name}</p>
                <p>Committee Chair</p>
                <a href={`${committee.url}`}target={'_blank'} >Visit the {committee.name} website</a>
                <p>Subcommittees:</p>
                { subcommittees.map (subcomm => <p><span role='img'>🇺🇸</span> - {subcomm}</p>)}
            </>
        )})
    }

    renderCompareBtn = () => {
        if (this.props.compareSenators.filter(sen => sen.id == this.props.senator.id).length > 0) {
            return(<button onClick={(e)=> this.handleRemoveComparison(e)}>Remove This Comparison</button>)
        } else {
            return (<button className='compare-btn' onClick={(e)=> this.handleAddComparison(e)}>Compare {this.props.representative.name} with their colleagues</button>)
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
                <h3>{this.props.senator.name}</h3>
                <p>Party Affiliation:</p> <span>{this.props.senator.party}</span>
                <p>Chamber of Congress:{this.props.senator.chamber}</p>
                <p>Role: {this.props.senator.role}</p>
                <hr width='35%'/>
                {this.props.displayState ? <CongressConnectedStateTile state={this.props.displayState} /> : <div>State details loading...</div>}
                <p>Twitter Handle: <a href={`https://twitter.com/${this.props.senator.twitter_id}`} target={'_blank'}>@{this.props.senator.twitter_id}</a></p>
                <p>Facebook: <a href={`https://www.facebook.com/${this.props.senator.facebook_account}`} target={'_blank'}>{this.props.senator.facebook_account}</a></p>
                <p>Gender: {this.props.senator.gender}</p>
                <p>Next Election: {this.props.senator.next_election}</p>
                <p>Term Length: 6 years</p>
                {this.props.senator.senate_committees ? this.renderSenateCommittees() : null}
                {this.props.loggedInUser.username ? this.renderCompareBtn() : null }
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