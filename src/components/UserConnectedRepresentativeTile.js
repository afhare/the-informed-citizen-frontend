import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class UserConnectedRepresentativeTile extends React.Component {
    render(){
        return(
            <div className={`user-grid-item ${this.props.representative.party}`}>
                <p>Name: {this.props.representative.name}</p>
                <p>Party Affiliation: {this.props.representative.party}</p>
                <p>Role : {this.props.representative.role}</p>
                <Link to={`/representatives/${this.props.representative.id}`}> View {this.props.representative.name}'s Page</Link>
            </div>
        )
    }
}

// export default connect()(UserConnectedRepresentativeTile)
export default UserConnectedRepresentativeTile