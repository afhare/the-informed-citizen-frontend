import React from 'react';
import { connect } from 'react-redux'

class SenatorShow extends React.Component {
    render(){
        return(
            <div className='senator-card'>
                <p>Name: {this.props.senator.name}</p>
                <p>Party Affiliation: {this.props.senator.party}</p>
                <p>Chamber of Congress:{this.props.senator.chamber}</p>
                <p>Role: {this.props.senator.role}, {this.props.senator.state.abbreviation}</p>
                <hr width='35%'/>
                <p>State: {this.props.senator.state.name}</p>
                <p>Twitter Handle: <a href={`https://twitter.com/${this.props.senator.twitter_id}`} target={'_blank'}>@{this.props.senator.twitter_id}</a></p>
                <p>Facebook: <a href={`https://www.facebook.com/${this.props.senator.facebook_account}`} target={'_blank'}>{this.props.senator.facebook_account}</a></p>
                <p>Gender: {this.props.senator.gender}</p>
                <p>Next Election: {this.props.senator.next_election}</p>
                <p>Term Length: 6 years</p>
            </div>
        )
    }
}

export default connect()(SenatorShow)