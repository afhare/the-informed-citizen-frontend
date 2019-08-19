import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchShowHouseRep, removeCompareHouseReps} from '../actions'

class CompareRepTile extends React.Component {
    renderHouseCommittees = () => {
        return this.props.representative.house_committees.map (committee => {
            return (
            <>
                <p>{committee.name} : Committee Chair</p>
            </>
        )})
    }

    renderJointCommittees = () => {
        return this.props.representative.joint_committees.map (committee => {
            return (
            <>
                <p>{committee.name} : Committee Chair</p>
            </>
        )})
    }

    handleRemoveComparison = (e) => {
        e.preventDefault();
        console.log('clicked')
        this.props.removeCompareHouseReps(this.props.representative.id)
    }

    render(){
        return(
            <div className={`representative-tile ${this.props.representative.party}`}>
                <p>Name: {this.props.representative.name}</p>
                <p>Party Affiliation: {this.props.representative.party}</p>
                <p>State: {this.props.representative.state.name}</p>
                <p>{this.props.representative.role}</p>
                {this.props.representative.house_committees ? this.renderHouseCommittees() : null}
                {this.props.representative.joint_committees ? this.renderJointCommittees() : null}
                <p>Next Election: {this.props.representative.next_election}</p>
                <p>Term Length: 2 years</p>
                <Link to={`/representatives/${this.props.representative.id}`} onClick={() => this.props.fetchShowHouseRep(this.props.representative.id)}> View More Details</Link>
                <br/>
                <button onClick={(e)=> this.handleRemoveComparison(e)}>Remove This Comparison</button>
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
        },
        removeCompareHouseReps: (id) => {
            dispatch(removeCompareHouseReps(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompareRepTile)