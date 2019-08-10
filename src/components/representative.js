import React { Component } from 'React';
import { connect } from 'react-redux'

class Representative extends Component {
    render(){
        return(
            <div className='representative-card'>
            Name:
            Party Affiliation:
            Chamber of Congress:
            <hr width='35%'/>
            State:
            District:
            Twitter Handle:
            Facebook:
            Gender:
            Next Election:
            Term Length:
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Representative)