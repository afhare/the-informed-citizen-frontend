import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom';
import StateTile from './StateTile'

class RepresentativeShow extends React.Component {
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
    displayState: state.showHouseRep.state
}
}

export default connect(mapStateToProps, null)(RepresentativeShow)
// export default RepresentativeShow