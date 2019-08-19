import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch, Link } from 'react-router-dom';
import UserConnectedRepresentativeTile from './UserConnectedRepresentativeTile';
import UserConnectedSenatorTile from './UserConnectedSenatorTile';
import StateTile from './StateTile';
import { verifyLogin } from '../actions'
import Loader from './Loader';
import DeleteUserConfirmation from './DeleteUserConfirmation';

class UserShow extends React.Component {
    constructor(props){
        super(props)
        this.state={
            deleteView:false
        }
    }
    componentDidMount(){
        console.log(this.props.user)
    }

    toggleDeleteView = () => {
        this.setState({deleteView : !this.state.deleteView})
    }

    checkLoggedIn = () => {
        switch (localStorage.getItem('user')){
            case localStorage.getItem('user') != undefined && this.props.user ==[]:
                this.props.verifyLogin(localStorage.getItem('user'))
                return true
            case (!localStorage.getItem('user') || localStorage.getItem('user')== undefined) && this.props.user ==[]:
                    return false
            case (!localStorage.getItem('user') || localStorage.getItem('user')== undefined) && this.props.user:
                localStorage.setItem('user', this.props.user.jwt)
                return true
            case localStorage.getItem('user')!= undefined && this.props.user:
                return true
            default:
                return false
        }
    }

    displayPollingPlace = () => {
        // fetch call to google API
        return ( <p>Not there yet!</p>)
    }

    displayRepresentative = () => {
        if (this.props.user.representatives[0]) {
            return this.props.user.representatives.map(representative => <UserConnectedRepresentativeTile representative={representative}/>)
        } else if (!this.props.user.representatives[0] || !this.props.user.representatives) {
            return (
                <>
                <p> If you do not see your representative listed below,<br/>a list of all {this.props.user.state.abbreviation}'s representatives can be found <Link to={`/states/${this.props.user.state.id}`}>here</Link>.</p>
                </>
            )
        }
    }

    displaySenators = () => {
        if (this.props.user.senators[0]){
            return this.props.user.senators.map(senator => <UserConnectedSenatorTile senator={senator}/>)
        } else if (!this.props.user.senators[0] || !this.props.user.senators) {
            return(<> 
            <p> If you do not see your senators listed below,
                <br/>a list of all {this.props.user.state.abbreviation}'s senators can be found <Link to={`/states/${this.props.user.state.id}`}>here</Link>.</p>
            </>)
        }
    }

    render(){
        return (<Switch>
            < Route path='/profile' render={ () => {
                return(
                    <div>
                        {this.checkLoggedIn() ? 
                            <div>Profile Loading, please wait ... 
                            <Loader />
                            </div> :
            <div className='user-card'>
                <p>Name: {this.props.user.name}</p>
                <p>Username: {this.props.user.username}</p>
                <hr width='35%'/>
                <div>
                    <h4>Street Address: </h4> <p>{this.props.user.street_address}</p>
                    <h4>City: </h4> <p>{this.props.user.city}</p>
                    <h4>Zipcode: </h4> <p>{this.props.user.zipcode}</p>
                    {this.props.displayState ? <StateTile state={this.props.displayState} /> : <div>State details loading...</div>}
                <p>Polling place: </p> {this.displayPollingPlace()}
                </div>
                <div className='user-congress-container'>
                    <h4>My Senators: </h4>
                        <div className='user-grid-container'>
                            {this.props.user.senators ? this.displaySenators() : null }
                        </div>
                    <h4>My Representative: </h4>
                        <div className='user-grid-container'>
                        { this.props.user.representatives ? this.displayRepresentative() : null }
                        </div>
                
                </div>
                {this.state.deleteView ? <DeleteUserConfirmation cancelClick={this.toggleDeleteView} history={this.props.history}/> : <button onClick={this.toggleDeleteView}>Delete my Account</button>}
                
            </div>
        }
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
        user: state.loggedInUser,
        displayState : state.loggedInUser.state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        verifyLogin: (token) => {
            dispatch(verifyLogin(token))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow)

// <h4>State: </h4> <Link to={`/states/${this.props.user.state.state_id}`}> {this.props.user.state} </Link>