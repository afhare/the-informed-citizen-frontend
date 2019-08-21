import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchShowSenator } from '../actions'

class UserConnectedSenatorTile extends React.Component {
    render(){
        return(
            <div className={`user-grid-item ${this.props.senator.party}`}>
                <p>Name: {this.props.senator.name}</p>
                <p>Party Affiliation: {this.props.senator.party}</p>
                <p>Role : {this.props.senator.role}</p>
                <Link to={`/senators/${this.props.senator.id}`} onClick={() => this.props.fetchShowSenator(this.props.senator.id)}> View {this.props.senator.name}'s Page</Link>
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
        fetchShowSenator: (id) => {
            dispatch(fetchShowSenator(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserConnectedSenatorTile)