import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCompareHouseReps, fetchCompareSenators } from '../actions'
import Loader  from '../components/Loader';
import CompareRepTile from '../components/CompareRepTile'
import CompareSenatorTile from '../components/CompareSenatorTile'

class CompareMOCContainer extends React.Component {

    renderComparisons = () => {
        return ( 
        <>
            <h3>Compare members of congress below. <br/>Don't see any? <br />Visit the "View Congressional Representatives" link above to find representatives and senators to compare.</h3>
            {this.renderHouseComparisons()}
            {this.renderSenateComparisons()}
        </>
        )
    }

    renderHouseComparisons = () => {
        return this.props.compareRepresentatives.map(representative => {return <CompareRepTile representative={representative} />})
    }

    renderSenateComparisons = () => {
        return this.props.compareSenators.map(senator => {return <CompareSenatorTile senator={senator} />})
    }

    render(){
        return (
        <Switch>
            < Route exact path='/compare' render={ () => {
                return(
                    <div>
                        {this.props.loader ? <div>Loading, please wait ...<Loader/></div> : this.renderComparisons()}
                    </div>
                )
            }}
            />
        </Switch>
        )
    }
}

    const mapStateToProps = (state) => {
        return {
            senators: state.senators,
            representatives: state.representatives,
            loader: state.loader,
            compareRepresentatives: state.compareRepresentatives,
            compareSenators: state.compareSenators
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            fetchCompareHouseReps: () => {
                dispatch(fetchCompareHouseReps())
            },
            fetchCompareSenators: () => {
                dispatch(fetchCompareSenators())
            }
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(CompareMOCContainer)