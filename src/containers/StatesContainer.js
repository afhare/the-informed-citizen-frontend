import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import StateTile from '../components/StateTile';
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class StatesContainer extends React.Component {
    componentDidMount(){
        console.log(this.props)
    };

    constructor(props){
        super(props)
        this.state={
            searchTerm: ''
        }
    }

    renderStates = () => {
        const desiredStates = this.props.states.filter(stateObj => stateObj.name.includes(this.state.searchTerm))
        const states = this.state.searchTerm ? desiredStates.map(stateObj => <StateTile key={stateObj.id} state={stateObj}/>) : this.props.states.map(stateObj => <StateTile key={stateObj.id} state={stateObj}/>)
        return (
            <div>
                <h1>United States of America and Territories</h1>
                <div className='state-search'>
                    <h1>Search for a specific State:</h1>
                    <Search onSearchChange={_.debounce(this.handleSearchChange, 500)} showNoResults={false} />
                </div>
                <hr width='25%' />
                    <div className='states-and-territories state-grid-container'>{states}</div>
            </div>
        )
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ searchTerm: value})
    }

    render(){
        return (<Switch>
            < Route path='/states' render={ () => {
                return(
                    <div>
                        {this.props.loader ? <div>Loading, please wait ...</div> : this.renderStates()}
                    </div>
                )
            }}
            />
        </Switch>
        )
    }

    // const mapStateToProps = (state) => {
    //     return {
    //         senators: state.senators,
    //         representatives: state.representatives,
    //         loader: state.loader
    //     }
    // }

    // const mapDispatchToProps = (dispatch) => {
    //     return {
    //         fetchHouseReps: () => {
    //             dispatch(fetchHouseReps)
    //         },
    //         fetchSenators: () => {
    //             dispatch(fetchSenators)
    //         }
    //     }
    // }
}

// export default connect()(StatesContainer)
export default StatesContainer