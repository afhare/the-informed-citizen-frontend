import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchHouseReps, fetchSenators } from '../actions'
import SenatorShow from '../components/SenatorShow';
import RepresentativeShow from '../components/RepresentativeShow';
import RepresentativeTile from '../components/RepresentativeTile';
import SenatorTile from '../components/SenatorTile';

class CongressContainer extends React.Component {
    // componentDidMount(){
    //     this.props.fetchHouseReps();
    //     this.props.fetchSenators();
    // };

    renderCongress = () => {
        const representatives = this.props.representatives.map( rep => <RepresentativeTile key={rep.id} representative={rep}/>)
        const senators = this.props.senators.map(senator => <SenatorTile key={senator.id} senator={senator}/>)
        return (
            <div>
                <h1>Congress</h1>
                <hr width='25%' />
                <h2>House of Representatives</h2>
                    <div className='congress-representatives grid-container'>{representatives}</div>
                <hr width='25%' />
                <h2>Senate</h2>
                    <div className='congress-senators'>{senators}</div>
                <hr width='25%' />
            </div>
        )
    }

    render(){
        return (<Switch>
            <Route path='/senators/:senatorId' 
            render={
                (route) => {
                    console.log('route', route.match.params)
                    const id = route.match.params.senatorId
                    const senator = this.props.senators.find(senator => senator.id == id)
                    return (
                        <div>
                            <SenatorShow senator={senator}/>
                        </div>
                    )}
            } 
            />
            
            <Route path='/representatives/:representativeId' render={
                (route) => {
                    console.log('route', route.match.params)
                    const id = route.match.params.representativeId
                    const representative = this.props.senators.find(rep => rep.id == id)
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

export default connect()(CongressContainer)