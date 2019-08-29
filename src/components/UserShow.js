import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch, Link } from 'react-router-dom';
import UserConnectedRepresentativeTile from './UserConnectedRepresentativeTile';
import UserConnectedSenatorTile from './UserConnectedSenatorTile';
import CongressConnectedStateTile from './CongressConnectedStateTile';
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

    displayRepresentative = () => {
        if (this.props.user.representatives[0]) {
            return this.props.user.representatives.map(representative => <UserConnectedRepresentativeTile representative={representative}/>)
        } else if (!this.props.user.representatives[0] || !this.props.user.representatives) {
            return (
                <>
                <p> Keep up to date with any member of the House of Representatives. To get started,<br/>a list of all {this.props.user.state.abbreviation}'s representatives can be found <Link to={`/states/${this.props.user.state.id}`}>here</Link>.</p>
                </>
            )
        }
    }

    displaySenators = () => {
        if (this.props.user.senators[0]){
            return this.props.user.senators.map(senator => <UserConnectedSenatorTile senator={senator}/>)
        } else if (!this.props.user.senators[0] || !this.props.user.senators) {
            return(<> 
            <p> Keep up to date with any member of the Senate. To get started, 
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
                <h2>{this.props.user.username}'s Homepage</h2>
                <h3>Welcome, {this.props.user.name}!</h3>
                <hr width='35%'/>
                <div>
                    {this.props.displayState ? <CongressConnectedStateTile state={this.props.displayState} /> : <div>State details loading...</div>}
                </div>
                <div className='user-congress-container'>
                    <h4>My Senators: </h4>
                            {this.props.user.senators ? this.displaySenators() : null }
                    <h4>My Representatives: </h4>
                        { this.props.user.representatives ? this.displayRepresentative() : null }
                        <hr width='35%'/>
                        <br/>
                </div>
                {this.state.deleteView ? <DeleteUserConfirmation cancelClick={this.toggleDeleteView} history={this.props.history}/> : <button className='delete-view-btn' onClick={this.toggleDeleteView}>Delete my Account</button>}
                
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