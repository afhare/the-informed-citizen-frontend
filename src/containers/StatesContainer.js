import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStates } from '../actions'
import StateTile from '../components/StateTile';
import Loader  from '../components/Loader';
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
import Map from '../components/Map'

class StatesContainer extends React.Component {
    componentDidMount(){
        this.props.fetchStates();
    };

    constructor(props){
        super(props)
        this.state={
            searchTerm: '',
            mapFilter: 'none',
            showMap: false,
        }
    }

    updateMapFilter = (e) => {
        e.preventDefault();
        this.setState({mapFilter: e.target.value})
    }

    handleCompareButtonClick = (e) => {
        e.preventDefault();
        const map = document.getElementsByClassName('map-view')[0]
        if (map.style.display == 'none'){
            map.style.display = 'block'
            this.setState({showMap: true})
        } else {
            map.style.display = 'none'
            this.setState({clicked: false})
        } 
    }

    renderStates = () => {
        const desiredStates = this.props.states.filter(stateObj => stateObj.name.includes(this.state.searchTerm))
        const states = this.state.searchTerm ? desiredStates.map(stateObj => <StateTile key={stateObj.id} state={stateObj}/>) : this.props.states.map(stateObj => <StateTile key={stateObj.id} state={stateObj}/>)
        return (
            <div>
                <h1 className='title'>United States of America and Territories</h1>
                <br/>
                <br/>
                <button className='tall-compare-btn' onClick={(e)=> this.handleCompareButtonClick(e)}>{this.state.showMap ? 'Hide The Comparison Map' : 'Show The Comparison Map'}</button>
                <div className='map-view'>
                    <h2>United States of America Voting Data Visualization</h2>
                    <Map filter={this.state.mapFilter}/>

                    <h4 className='map-input'><input type="radio" name="mapFilter" value="none" onChange={(e)=>this.updateMapFilter(e)} checked={this.state.mapFilter === 'none'}/>Standard Map : No Filter</h4>
                    <br/>
                    <h4 className='map-input'><input type="radio" name="mapFilter" value="voting-turnout" onChange={(e)=>this.updateMapFilter(e)} checked={this.state.mapFilter === 'voting-turnout'}/>2018 Voting Turnout Percentage</h4>
                    <h5>The voting percentage filter reflects on the range of voter turnout percentages in 2018.<br/> Higher voter percentages are darker; lower voting percentages are lighter.</h5>
                    <h4 className='map-input'><input type="radio" name="mapFilter" value="voting-rights-score" onChange={(e)=>this.updateMapFilter(e)} checked={this.state.mapFilter === 'voting-rights-score'}/>Voting Rights Score</h4>
                    <h5>The voting rights score filter reflects on the ease of access to voting, for example: <br/> whether a state requires photo ID, or allows same-day registration.<br/> States with lower barriers to voting are darker; states with higher barriers are lighter.</h5>
                    <h4 className='map-input'><input type="radio" name="mapFilter" value="gender" onChange={(e)=>this.updateMapFilter(e)} checked={this.state.mapFilter === 'gender'}/>Gender Representation: House and Senate: Blue/Red Scale</h4>
                    <h5>The gender representation filter reflects the representation of the 116th Congress by state, on a spectrum of representation. <br/>States with predominantly male members of Congress are reflected on the blue color scale, <br/>while states with predominantly female members of Congress are reflected on the red color scale.</h5>
                    <h4 className='map-input'><input type="radio" name="mapFilter" value="gender-black-white-scale" onChange={(e)=>this.updateMapFilter(e)} checked={this.state.mapFilter === 'gender-black-white-scale'}/>Alternate Gender Representation: House and Senate: Black/White Scale</h4>
                    <h5>The gender representation filter reflects the representation of the 116th Congress by state, on a spectrum of representation. <br/>States with predominantly male members of Congress are reflected on the black color scale, <br/>while states with predominantly female members of Congress are reflected on the white color scale.</h5>
                </div>
                <div className='state-search'>
                    <h1>Search for a specific State:</h1>
                    <Search className='search-input' onSearchChange={_.debounce(this.handleSearchChange, 500)} showNoResults={false} />
                </div>
                <br />
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
                        {this.props.loader ? <Loader/> : this.renderStates()}
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
            states: state.states,
            loader: state.loader
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            fetchStates: () => {
                dispatch(fetchStates())
            }
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(StatesContainer)