import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchShowSenator } from '../actions'

class StateConnectedSenatorTile extends React.Component {
    renderParty = () => {
        if (this.props.senator.party == 'D'){
            return (<h5>Democrat</h5>)
        } else if (this.props.senator.party == 'R'){
            return (<h5>Republican</h5>)
        } else if (this.props.senator.party =='ID'){
            return (<h5>Independent</h5>)
        }
    }
    
    render(){
        return(
            <div className={`state-senator-tile ${this.props.senator.party}`}>
                <h4>{this.props.senator.name}</h4>
                {this.renderParty()}
                <h5>{this.props.senator.chamber} : {this.props.senator.role}</h5>
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

export default connect(mapStateToProps, mapDispatchToProps)(StateConnectedSenatorTile)