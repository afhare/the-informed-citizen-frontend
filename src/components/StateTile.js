import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchShowState } from '../actions'

class StateTile extends React.Component {
    render(){
        return(
            <div className={`state-tile grid-item`}>
                {this.props.state.name ? <p>Name: {this.props.state.name}</p> : null }
                {this.props.state.name ? <p>Abbreviation: {this.props.state.abbreviation}</p> : <p>My home state: {this.props.state.abbreviation}</p>}
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