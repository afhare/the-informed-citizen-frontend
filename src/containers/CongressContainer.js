import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchHouseReps, fetchSenators } from '../actions'
import RepresentativeTile from '../components/RepresentativeTile';
import SenatorTile from '../components/SenatorTile';
import Loader  from '../components/Loader';
import { Search } from 'semantic-ui-react';
import _ from 'lodash'

class CongressContainer extends React.Component {
    componentDidMount(){
        this.props.fetchHouseReps();
        this.props.fetchSenators();
    };

    constructor(props){
        super(props)
        this.state={
            searchTerm:'',
            filterType:'standard',
            filterState: ''
        }
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ searchTerm: value})
    }

    handleSelectChange = (e) => {
        let filteredState = e.target.value.split(' ')[1]
        this.setState({filterType: e.target.value, filterState: filteredState})
    }

    renderCongress = () => {
        
        let desiredReps = this.props.representatives.filter(representativeObj => representativeObj.name.includes(this.state.searchTerm))
        let desiredSenators = this.props.senators.filter(senatorObj => senatorObj.name.includes(this.state.searchTerm))
        
        let representatives = this.props.representatives.map( rep => <RepresentativeTile key={rep.id} representative={rep}/>)
        let senators = this.props.senators.map(senator => <SenatorTile key={senator.id} senator={senator}/>)

        if (this.state.filterState && !this.state.searchTerm) {
            desiredReps = this.props.representatives.filter(representativeObj => representativeObj.state.abbreviation.includes(this.state.filterState))
            representatives = desiredReps.map( representative => <RepresentativeTile key={representative.id} representative={representative}/>)
            
            desiredSenators = this.props.senators.filter(senatorObj => senatorObj.state.abbreviation.includes(this.state.filterState))
            senators = desiredSenators.map( senator => <SenatorTile key={senator.id} senator={senator}/>)

        } else if (this.state.filterState && this.state.searchTerm) {
            let stateFilteredDesiredReps = this.props.representatives.filter(representativeObj => representativeObj.state.abbreviation.includes(this.state.filterState))
            desiredReps = stateFilteredDesiredReps.filter(representativeObj => representativeObj.name.includes(this.state.searchTerm))
            representatives = desiredReps.map( representative => <RepresentativeTile key={representative.id} representative={representative}/>)

            let stateFilteredDesiredSenators = this.props.senators.filter(senatorObj => senatorObj.state.abbreviation.includes(this.state.filterState))
            desiredSenators = stateFilteredDesiredSenators.filter(senatorObj => senatorObj.name.includes(this.state.searchTerm))
            senators = desiredSenators.map( senator => <SenatorTile key={senator.id} senator={senator}/>)
        } else if (!this.state.filterState && this.state.searchTerm) {
            representatives = desiredReps.map( representative => <RepresentativeTile key={representative.id} representative={representative}/>)
            senators = desiredSenators.map( senator => <SenatorTile key={senator.id} senator={senator}/>)
        }


        return (
            <div>
                <div className='congress-search'>
                    <h1 className='title'>Members of the 116th Congress</h1>
                    <h2>Search for a specific member of Congress: </h2>
                    <h3>Search by name (case-sensitive): </h3><Search onSearchChange={_.debounce(this.handleSearchChange, 500)} showNoResults={false} />
                    <h3>Search by state: </h3>
                    <select onChange={(e) => this.handleSelectChange(e)}>
                        <option value='standard'>Select a state by name:</option>
                        <option value='state AL'>Alabama</option>
                        <option value='state AK'>Alaska</option>
                        <option value='state AZ'>Arizona</option>
                        <option value='state AR'>Arkansas</option>
                        <option value='state CA'>California</option>
                        <option value='state CO'>Colorado</option>
                        <option value='state CT'>Connecticut</option>
                        <option value='state DE'>Delaware</option>
                        <option value='state DC'>District of Columbia</option>
                        <option value='state FL'>Florida</option>
                        <option value='state GA'>Georgia</option>
                        <option value='state HI'>Hawaii</option>
                        <option value='state ID'>Idaho</option>
                        <option value='state IL'>Illinois</option>
                        <option value='state IN'>Indiana</option>
                        <option value='state IA'>Iowa</option>
                        <option value='state KS'>Kansas</option>
                        <option value='state KY'>Kentucky</option>
                        <option value='state LA'>Louisiana</option>
                        <option value='state ME'>Maine</option>
                        <option value='state MD'>Maryland</option>
                        <option value='state MA'>Massachussetts</option>
                        <option value='state MI'>Michigan</option>
                        <option value='state MN'>Minnesota</option>
                        <option value='state MS'>Mississippi</option>
                        <option value='state MO'>Missouri</option>
                        <option value='state MT'>Montana</option>
                        <option value='state NE'>Nebraska</option>
                        <option value='state NV'>Nevada</option>
                        <option value='state NH'>New Hampshire</option>
                        <option value='state NJ'>New Jersey</option>
                        <option value='state NM'>New Mexico</option>
                        <option value='state NY'>New York</option>
                        <option value='state NC'>North Carolina</option>
                        <option value='state ND'>North Dakota</option>
                        <option value='state OH'>Ohio</option>
                        <option value='state OK'>Oklahoma</option>
                        <option value='state OR'>Oregon</option>
                        <option value='state PA'>Pennsylvania</option>
                        <option value='state RI'>Rhode Island</option>
                        <option value='state SC'>South Carolina</option>
                        <option value='state SD'>South Dakota</option>
                        <option value='state TN'>Tennessee</option>
                        <option value='state TX'>Texas</option>
                        <option value='state UT'>Utah</option>
                        <option value='state VT'>Vermont</option>
                        <option value='state VA'>Virginia</option>
                        <option value='state WA'>Washington</option>
                        <option value='state WV'>West Virginia</option>
                        <option value='state WI'>Wisconsin</option>
                        <option value='state WY'>Wyoming</option>
                        <option value='standard'> - Select a US Territory Below- </option>
                        <option value='state PR'>Puerto Rico</option>
                        <option value='state GU'>Guam</option>
                        <option value='state AS'>American Samoa</option>
                        <option value='state MP'>Marianas Islands</option>
                        <option value='state VI'>Virgin Islands</option>
                    </select>
                </div>
                <br/>
                <hr width='25%' />
                <br/>
                <h1 className='title'>House of Representatives</h1>
                    <div className='congress-representatives congress-grid-container'>{representatives}</div>
                <br/>
                <hr width='25%' />
                <br/>
                <h1 className='title'>Senate</h1>
                    <div className='congress-senators congress-grid-container'>{senators}</div>
            </div>
        )
    }

    render(){
        return (
        <Switch>
            < Route path='/' render={ () => {
                return(
                    <div>
                        {this.props.loader ? <Loader/> : this.renderCongress()}
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
            loader: state.loader
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            fetchHouseReps: () => {
                dispatch(fetchHouseReps())
            },
            fetchSenators: () => {
                dispatch(fetchSenators())
            }
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(CongressContainer)