import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import StateTile from './StateTile'
import { fetchSenators, fetchShowSenator, fetchCompareSenators} from '../actions'

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

    handleAddComparison = (e) => {
        e.preventDefault();
        console.log('clicked')
        this.props.fetchCompareSenators(this.props.senator.id, localStorage.getItem('user'))
    }

    renderSenator = () => {
        return(
            <div className='senator-card'>
                <p>Name: {this.props.senator.name}</p>
                <p>Party Affiliation: {this.props.senator.party}</p>
                <p>Chamber of Congress:{this.props.senator.chamber}</p>
                <p>Role: {this.props.senator.role}</p>
                <hr width='35%'/>
                <p>Twitter Handle: <a href={`https://twitter.com/${this.props.senator.twitter_id}`} target={'_blank'}>@{this.props.senator.twitter_id}</a></p>
                <p>Facebook: <a href={`https://www.facebook.com/${this.props.senator.facebook_account}`} target={'_blank'}>{this.props.senator.facebook_account}</a></p>
                <p>Gender: {this.props.senator.gender}</p>
                <p>Next Election: {this.props.senator.next_election}</p>
                <p>Term Length: 6 years</p>
                {this.props.displayState ? <StateTile state={this.props.displayState} /> : <div>State details loading...</div>}
                {this.props.senator.senate_committees ? this.renderSenateCommittees() : null}
                <button onClick={(e)=> this.handleAddComparison(e)}>Compare {this.props.senator.name} with their colleagues</button>
            </div>
        )
    }

    render(){
        return(
            <Switch>
               <Route path='/senators/:senatorID'>
                    {this.props.loader ? <div>Loading, please wait ...</div> : this.renderSenator()}
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
        loggedInUser: state.loggedInUser
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SenatorShow)