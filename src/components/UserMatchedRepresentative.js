import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchShowHouseRep, fetchShowSenator } from '../actions'

class UserMatchedRepresentative extends React.Component {

    positionOfMOC = () => {
        if (this.props.representative.urls[0].includes('house')) {
            return "Representative"
        } else if (this.props.representative.urls[0].includes('senate')){
            return "Senator"
        }
    }
    
    renderConnectedLink = () => {
        if (this.props.representative.urls[0].includes('house')) {
            return <Link to={`/representatives/${this.props.matchedRepresentative.id}`} onClick={() => this.props.fetchShowHouseRep(this.props.matchedRepresentative.id)}> View {this.props.representative.name}'s Page</Link>
        } else if (this.props.representative.urls[0].includes('senate')){
            return <Link to={`/senators/${this.props.matchedRepresentative.id}`} onClick={() => this.props.fetchShowSenator(this.props.matchedRepresentative.id)}> View {this.props.representative.name}'s Page</Link>
        }
    }

    renderMatchedReps = () => {
        return (
            <div className={`address-match-congressperson ${this.props.representative.party[0]}`}>
                <p>{this.positionOfMOC()} {this.props.representative.name}</p>
                <p>Phone: {this.props.representative.phones}</p>
                {this.props.matchedRepresentative ? this.renderConnectedLink() : `While ${this.props.representative.name} represents the constituents of ${this.props.state}, they are not a member of the 116th US Congress.`}
            </div>
        )
    }

    render(){
        return(
            <>
                {this.props.representative ? this.renderMatchedReps() : null}
            </>
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
        },
        fetchShowSenator: (id) => {
            dispatch(fetchShowSenator(id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserMatchedRepresentative)