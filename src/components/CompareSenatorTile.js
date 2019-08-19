import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchShowSenator, removeCompareSenators} from '../actions'

class CompareSenatorTile extends React.Component {
    renderSenateCommittees = () => {
        return this.props.senator.senate_committees.map (committee => {
            return (
            <>
                <p>{committee.name} : Committee Chair</p>
            </>
        )})
    }

    handleRemoveComparison = (e) => {
        e.preventDefault();
        console.log('clicked')
        this.props.removeCompareSenators(this.props.senator.id)
    }

    render(){
        return(
            <div className={`senator-tile ${this.props.senator.party}`}>
                <p>Name: {this.props.senator.name}</p>
                <p>Party Affiliation: {this.props.senator.party}</p>
                <p>State: {this.props.senator.state.name}</p>
                <p>{this.props.senator.role}</p>
                {this.props.senator.senate_committees ? this.renderSenateCommittees() : null}
                <p>Next Election: {this.props.senator.next_election}</p>
                <p>Term Length: 6 years</p>
                <Link to={`/senators/${this.props.senator.id}`} onClick={() => this.props.fetchShowSenator(this.props.senator.id)}> View More Details</Link>
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
        fetchShowSenator: (id) => {
            dispatch(fetchShowSenator(id))
        },
        removeCompareSenators: (id) => {
            dispatch(removeCompareSenators(id))
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompareSenatorTile)