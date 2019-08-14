import React from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import UserConnectedRepresentativeTile from './UserConnectedRepresentativeTile';
import UserConnectedSenatorTile from './UserConnectedSenatorTile';

class UserShow extends React.Component {

    displayPollingPlace = () => {
        // fetch call to google API
        return ( <p>Not there yet!</p>)
    }

    displayRepresentative = () => {
        return this.props.user.representatives.map(representative => <UserConnectedRepresentativeTile representative={representative}/>)
    }

    displaySenators = () => {
        return this.props.user.senators.map(senator => <UserConnectedSenatorTile senator={senator}/>)
    }

    render(){
        return(
            <div className='user-card'>
                <p>Name: {this.props.user.name}</p>
                <p>Username: {this.props.user.username}</p>
                <hr width='35%'/>
                <div>
                    <h4>Street Address: </h4> <p>{this.props.user.street_address}</p>
                    <h4>City: </h4> <p>{this.props.user.city}</p>
                    <h4>State: </h4> <Link to={`/states/${this.props.user.state_id}`}> {this.props.user.user_state} </Link>
                    <h4>Zipcode: </h4> <p>{this.props.user.zipcode}</p>
                <p>Polling place: </p> {this.displayPollingPlace()}
                </div>
                <div className='user-congress-container'>
                    <h4>My Senators: </h4>
                        <div className='user-grid-container'>
                            {this.displaySenators()}
                        </div>
                    <h4>My Representative: </h4>
                        <div className='user-grid-container'>
        { this.props.user.representatives.length > 0 ? this.displayRepresentative() : 
            <> <p> If you do not see a representative listed below,<br/>a list of all {this.props.user.user_state}'s representatives can be found <Link to={`/states/${this.props.user.state_id}`}>here</Link>.</p></> }
                        </div>
                </div>
            </div>
        )
    }
}

// export default connect()(UserShow)
export default UserShow