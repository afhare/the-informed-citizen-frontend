import React from 'react';
import { connect }from 'react-redux';
import { deleteUser } from '../actions';

class DeleteUserConfirmation extends React.Component {
  handleDeleteClick = (e) => {
    e.preventDefault();
    this.props.deleteUser(this.props.user.username, localStorage.getItem('user'), this.props.history)
  }
  
  
  render(){
    return (
      <div className="user-delete-window">
          <h3>Are you sure you want to delete your profile? This action cannot be undone.</h3>
          <div>
              <button onClick={(e)=>{e.preventDefault(); this.props.cancelClick()}} className='delete-cancel-btn'>No - do not delete my profile.</button>
              <button className='delete-confirm-btn' onClick={(e) => this.handleDeleteClick(e)}>Yes, I understand - delete my profile.</button>
          <hr width='35%'/>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedInUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUser: (username, token, history) => {
      dispatch(deleteUser(username, token, history))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUserConfirmation);