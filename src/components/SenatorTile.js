import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class SenatorTile extends React.Component {
    render(){
        return(
            <div className='senator-tile grid-item'>
                <p>Name: {this.props.senator.name}</p>
                <p>Party Affiliation: {this.props.senator.party}</p>
                <p>Chamber of Congress: {this.props.senator.chamber}</p>
                <p>State: {this.props.senator.state.name}</p>
                <Link to={`/senators/${this.props.senator.id}`}> View More Details</Link>
            </div>
        )
    }
}

export default connect()(SenatorTile)