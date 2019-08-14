import React from 'react';

class UserMatchedRepresentative extends React.Component {
    render(){
        return(
            <div className={this.props.representative.party[0]}>
                <p>{this.props.representative.name}</p>
                <p>Contact:</p>
                <p>Phone: {this.props.representative.phones}</p>
            </div>
        )
    }
}
export default UserMatchedRepresentative