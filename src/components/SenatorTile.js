import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class SenatorTile extends React.Component {
    render(){
        return(
            <div className={`representative-tile grid-item ${this.props.senator.party}`}>
                <p>Name: {this.props.senator.name}</p>
                <p>Party Affiliation: {this.props.senator.party}</p>
                <p>State: {this.props.senator.state.name}</p>
                <p>{this.props.senator.role}</p>
                <Link to={`/senators/${this.props.senator.id}`}> View More Details</Link>
            </div>
        )
    }
}

// export default connect()(SenatorTile)
export default SenatorTile