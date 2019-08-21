import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchShowState } from '../actions'

class StateTile extends React.Component {
    render(){
        return(
            <div className={`state-tile`}>
                {this.props.state.name ? <h3>{this.props.state.name}</h3> : null }
                {this.props.state.name ? <h4>Abbreviation: {this.props.state.abbreviation}</h4> : <h4>My home state: {this.props.state.abbreviation}</h4>}
                <Link to={`/states/${this.props.state.id}`} onClick={() => this.props.fetchShowState(this.props.state.id)}> View More Details</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loader: state.loader
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchShowState: (id) => {
            dispatch(fetchShowState(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StateTile)