import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchShowSenator, fetchCompareSenators, removeCompareSenators } from '../actions'
import republican from '../republican.svg'
import democrat from '../democrat.svg'
import flag from '../true-color-flag.svg'

class SenatorTile extends React.Component {
    renderCompareBtn = () => {
        if (this.props.compareSenators.filter(sen => sen.id == this.props.senator.id).length > 0) {
            return(<button onClick={(e)=> this.handleRemoveComparison(e)}>Remove This Comparison</button>)
        } else {
            return (<button className='compare-btn' onClick={(e)=> this.handleAddComparison(e)}>Compare {this.props.senator.name}<br/>with their colleagues</button>)
        }
    }

    handleAddComparison = (e) => {
        e.preventDefault();
        this.props.fetchCompareSenators(this.props.senator.id, localStorage.getItem('user'))
    }


    handleRemoveComparison = (e) => {
        e.preventDefault();
        this.props.removeCompareSenators(this.props.senator.id)
    }

    renderPartyIcon = () => {
        if (this.props.senator.party == 'D'){
            return (<img className='party-icon' src={democrat} height='13%' width='13%'/>)
        } else if (this.props.senator.party == 'R'){
            return (<img className='party-icon' src={republican} height='13%' width='13%'/>)
        } else if (this.props.senator.party =='ID'){
            return (<img className='party-icon' src={flag} height='13%' width='13%'/>)
        }
    }
    
    render(){
        return(
            <div className={`senator-tile grid-item ${this.props.senator.party}`}>
                <h4>{this.props.senator.name}</h4>
                <h5>Party Affiliation:</h5> <p>{this.props.senator.party}</p>
                {this.renderPartyIcon()}
                <h5>{this.props.senator.state.name}</h5>
                <p>{this.props.senator.role}</p>
                <Link to={`/senators/${this.props.senator.id}`} onClick={() => this.props.fetchShowSenator(this.props.senator.id)}> View More Details</Link>
                <br />
                {this.props.loggedInUser.username ? this.renderCompareBtn() : null }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loader: state.loader,
        loggedInUser: state.loggedInUser,
        compareSenators: state.compareSenators
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchShowSenator: (id) => {
            dispatch(fetchShowSenator(id))
        },
        fetchCompareSenators: (id, token) => {
            dispatch(fetchCompareSenators(id, token))
        },
        removeCompareSenators: (id) => {
            dispatch(removeCompareSenators(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SenatorTile)