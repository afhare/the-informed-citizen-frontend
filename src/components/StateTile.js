import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class StateTile extends React.Component {
    render(){
        return(
            <div className={`state-tile grid-item`}>
                <p>Name: {this.props.state.name}</p>
                <p>Abbreviation: {this.props.state.abbreviation}</p>
                <Link to={`/states/${this.props.state.id}`}> View More Details</Link>
            </div>
        )
    }
}

export default connect()(StateTile)