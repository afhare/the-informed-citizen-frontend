import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchShowHouseRep, fetchCompareHouseReps, removeCompareHouseReps} from '../actions'
import republican from '../republican.svg'
import democrat from '../democrat.svg'
import flag from '../true-color-flag.svg'


class RepresentativeTile extends React.Component {
    handleAddComparison = (e) => {
        e.preventDefault();
        this.props.fetchCompareHouseReps(this.props.representative.id, localStorage.getItem('user'))
    }

    renderCompareBtn = () => {
        if (this.props.compareRepresentatives.filter(rep => rep.id == this.props.representative.id).length > 0) {
            return(<button className='compare-btn' onClick={(e)=> this.handleRemoveComparison(e)}>Remove This Comparison</button>)
        } else {
            return (<button className='compare-btn' onClick={(e)=> this.handleAddComparison(e)}>Compare {this.props.representative.name}<br/>with their colleagues</button>)
        }
    }

    handleRemoveComparison = (e) => {
        e.preventDefault();
        this.props.removeCompareHouseReps(this.props.representative.id)
    }

    renderPartyIcon = () => {
        if (this.props.representative.party == 'D'){
            return (<img className='party-icon' src={democrat} />)
        } else if (this.props.representative.party == 'R'){
            return (<img className='party-icon' src={republican} />)
        } else if (this.props.representative.party =='ID'){
            return (<img className='party-icon' src={flag} />)
        }
    }

    renderParty = () => {
        if (this.props.representative.party == 'D'){
            return (<h5>Democrat</h5>)
        } else if (this.props.representative.party == 'R'){
            return (<h5>Republican</h5>)
        } else if (this.props.representative.party =='ID'){
            return (<h5>Independent</h5>)
        }
    }
    
    render(){
        return(
            <div className={`representative-tile grid-item ${this.props.representative.party}`}>
                {this.renderPartyIcon()}
                <h4>{this.props.representative.name}</h4>
                <h5>{this.props.representative.state.name}</h5>
                {this.renderParty()}
                <p>{this.props.representative.role}</p>
                <Link to={`/representatives/${this.props.representative.id}`} onClick={() => this.props.fetchShowHouseRep(this.props.representative.id)}> View More Details</Link>
                <br/>
                {this.props.loggedInUser.username ? this.renderCompareBtn() : null }
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loader: state.loader,
        loggedInUser: state.loggedInUser,
        compareRepresentatives: state.compareRepresentatives
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchShowHouseRep: (id) => {
            dispatch(fetchShowHouseRep(id))
        },
        fetchCompareHouseReps: (id, token) => {
            dispatch(fetchCompareHouseReps(id, token))
        },
        removeCompareHouseReps: (id) => {
            dispatch(removeCompareHouseReps(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepresentativeTile)