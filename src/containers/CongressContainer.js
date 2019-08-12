import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchHouseReps, fetchSenators } from '../actions'
import SenatorShow from '../components/SenatorShow';
import RepresentativeShow from '../components/RepresentativeShow';
import RepresentativeTile from '../components/RepresentativeTile';
import SenatorTile from '../components/SenatorTile';
import { Search } from 'semantic-ui-react';
import _ from 'lodash'

class CongressContainer extends React.Component {
    componentDidMount(){
        // this.props.fetchHouseReps();
        // this.props.fetchSenators();
        console.log(this.props)
    };

    constructor(props){
        super(props)
        this.state={
            searchTerm:''
        }
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ searchTerm: value})
    }


    renderCongress = () => {
        const desiredReps = this.props.representatives.filter(representativeObj => representativeObj.name.includes(this.state.searchTerm))

        const representatives = this.state.searchTerm ? 
            desiredReps.map( representative => <RepresentativeTile key={representative.id} representative={representative}/>) :
            this.props.representatives.map( rep => <RepresentativeTile key={rep.id} representative={rep}/>)
        
        const desiredSenators = this.props.senators.filter(senatorObj => senatorObj.name.includes(this.state.searchTerm))
        const senators = this.state.searchTerm ?
            desiredSenators.map( senator => <SenatorTile key={senator.id} senator={senator}/>) : 
            this.props.senators.map(senator => <SenatorTile key={senator.id} senator={senator}/>)
        return (
            <div>
                <h1>Congress</h1>
                <div className='congress-search'>
                    <h3>Search for a specific member of Congress by name: </h3>
                    <Search onSearchChange={_.debounce(this.handleSearchChange, 500)} showNoResults={false} />
                </div>
                <hr width='25%' />
                <h2>House of Representatives</h2>
                    <div className='congress-representatives congress-grid-container'>{representatives}</div>
                <hr width='25%' />
                <h2>Senate</h2>
                    <div className='congress-senators congress-grid-container'>{senators}</div>
            </div>
        )
    }

    render(){
        return (
        <Switch>
            <Route path='/senators/:senatorId' 
            render={
                (route) => {
                    const id = route.match.params.senatorId
                    const senator = this.props.senators.find(senator => senator.id === id)
                    return (
                        <div>
                            <SenatorShow senator={senator}/>
                        </div>
                    )}
            } 
            />
            
            <Route path='/representatives/:representativeId' render={
                (route) => {
                    const id = route.match.params.representativeId
                    const representative = this.props.representatives.find(rep => rep.id === id)
                    return (
                        <div>
                            <RepresentativeShow representative={representative}/>
                        </div>
                    )}
            } />
            < Route path='/' render={ () => {
                return(
                    <div>
                        {this.props.loader ? <div>Loading, please wait ...</div> : this.renderCongress()}
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

// export default connect()(CongressContainer)
export default CongressContainer