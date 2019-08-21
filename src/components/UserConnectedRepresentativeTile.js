import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchShowHouseRep} from '../actions'

class UserConnectedRepresentativeTile extends React.Component {
    render(){
        return(
            <div className={`user-grid-item ${this.props.representative.party}`}>
                <p>Name: {this.props.representative.name}</p>
                <p>Party Affiliation: {this.props.representative.party}</p>
                <p>Role : {this.props.representative.role}</p>
                <Link to={`/representatives/${this.props.representative.id}`} onClick={() => this.props.fetchShowHouseRep(this.props.representative.id)}> View {this.props.representative.name}'s Page</Link>
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
        fetchShowHouseRep: (id) => {
            dispatch(fetchShowHouseRep(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserConnectedRepresentativeTile)