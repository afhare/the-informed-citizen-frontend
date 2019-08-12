import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class RepresentativeTile extends React.Component {
    render(){
        return(
            <div className='representative-tile grid-item'>
                <p>Name: {this.props.representative.name}</p>
                <p>Party Affiliation: {this.props.representative.party}</p>
                <p>Chamber of Congress: {this.props.representative.chamber}</p>
                <p>State: {this.props.representative.state.name}</p>
                <Link to={`/representatives/${this.props.representative.id}`}> View More Details</Link>
            </div>
        )
    }
}

export default connect()(RepresentativeTile)