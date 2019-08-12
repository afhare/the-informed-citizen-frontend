import React from 'react';
import { connect } from 'react-redux'

class RepresentativeShow extends React.Component {
    render(){
        return(
            <div className='representative-card'>
                <p>Name: {this.props.representative.name}</p>
                <p>Party Affiliation: {this.props.representative.party}</p>
                <p>Chamber of Congress:{this.props.representative.chamber}</p>
                <p>Role: {this.props.representative.role}, {this.props.representative.state.abbreviation}</p>
                <hr width='35%'/>
                <p>State: {this.props.representative.state.name}</p>
                <p>District: {this.props.representative.district}</p>
                <p>Twitter Handle: <a href={`https://twitter.com/${this.props.representative.twitter_id}`} target={'_blank'}>@{this.props.representative.twitter_id}</a></p>
                <p>Facebook: <a href={`https://www.facebook.com/${this.props.representative.facebook_account}`} target={'_blank'}>{this.props.representative.facebook_account}</a></p>
                <p>Gender: {this.props.representative.gender}</p>
                <p>Next Election: {this.props.representative.next_election}</p>
                <p>Term Length: 2 years</p>
            </div>
        )
    }
}

// export default connect()(RepresentativeShow)
export default RepresentativeShow