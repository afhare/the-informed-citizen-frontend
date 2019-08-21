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
          <label>Are you sure you want to delete your profile? This action cannot be undone.</label>
          <div>
            <label>No - do not delete my profile.</label>
              <button onClick={(e)=>{e.preventDefault(); this.props.cancelClick()}} className='delete-cancel-square'></button>
            <label>I understand -- delete my profile.</label>
              <button className='delete-confirm-square' onClick={(e) => this.handleDeleteClick(e)}> </button>
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