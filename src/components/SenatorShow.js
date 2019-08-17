import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import StateTile from './StateTile'

class SenatorShow extends React.Component {
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
        displayState: state.showSenator.state,
        loggedInUser: state.loggedInUser
    }
}

export default connect(mapStateToProps, null)(SenatorShow)