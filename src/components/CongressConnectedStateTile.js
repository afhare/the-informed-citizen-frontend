import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchShowState } from '../actions'

class CongressConnectedStateTile extends React.Component {
    render(){
        return(
            <div className={`congress-connected-state-tile`}>
                {this.props.state.name ? <><h4>{this.props.state.name}</h4></> : null }
                {this.props.state.name ? null : <><h4>My home state:</h4><p>{this.props.state.abbreviation}</p> </>}
                {this.props.state.name ? <Link to={`/states/${this.props.state.id}`} onClick={() => this.props.fetchShowState(this.props.state.id)}> View {this.props.state.name}'s Details</Link> : <Link to={`/states/${this.props.state.id}`} onClick={() => this.props.fetchShowState(this.props.state.id)}> View {this.props.state.abbreviation}'s Details</Link>}
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

export default connect(mapStateToProps, mapDispatchToProps)(CongressConnectedStateTile)