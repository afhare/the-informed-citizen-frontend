import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class StateConnectedRepresentativeTile extends React.Component {
    render(){
        return(
            <div className={`grid-item ${this.props.representative.party}`}>
                <p>Name: {this.props.representative.name}</p>
                <p>Party Affiliation: {this.props.representative.party}</p>
                <p>{this.props.representative.chamber} : {this.props.representative.role}</p>
                <Link to={`/representatives/${this.props.representative.id}`}> View {this.props.representative.name}'s Page</Link>
            </div>
        )
    }
}

// export default connect()(StateConnectedRepresentativeTile)
export default StateConnectedRepresentativeTile