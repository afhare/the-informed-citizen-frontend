import React from 'react';

class UserMatchedRepresentative extends React.Component {
    positionOfMOC = () => {
        console.log(this.props.representative.name, this.props.representative.urls, 'includes house?', this.props.representative.urls[0].includes('house'))
        
        if (this.props.representative.urls[0].includes('house')) {
            return "Representative"
        } else if (this.props.representative.urls[0].includes('senate')){
            return "Senator"
        }
    }
    
    render(){
        return(
            <div className={this.props.representative.party[0]}>
                <p>{this.positionOfMOC()} {this.props.representative.name}</p>
                <p>Contact:</p>
                <p>Phone: {this.props.representative.phones}</p>
            </div>
        )
    }
}
export default UserMatchedRepresentative