import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {fetchShowHouseRep} from '../actions'


class StateConnectedRepresentativeTile extends React.Component {
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
            <div className={`state-representative-tile ${this.props.representative.party}`}>
                <h4>{this.props.representative.name}</h4>
                {this.renderParty()}
                <h5> {this.props.representative.role}</h5>
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

export default connect(mapStateToProps, mapDispatchToProps)(StateConnectedRepresentativeTile)