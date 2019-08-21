import React from 'react';
import { connect } from 'react-redux'
import congress from '../congress.svg'

class Home extends React.Component {
    render(){
        return(
            <div className='home'>
                <img src={congress} alt='Congress icon' />
                <h2>Welcome to The Digital Hill</h2>
                <hr width='10%'/>
                <p>Congress has the power to remove the president, federal judges, and other federal officers from office. The House of Representatives and Senate have separate roles in this process. The House must first vote to "impeach" the official. Then, a trial is held in the Senate to decide whether the official should be removed from office.  Although two presidents have been impeached by the House of Representatives (Andrew Johnson and Bill Clinton), neither of them was removed following trial in the Senate.</p>
                
                <p>Congressional oversight is intended to prevent waste and fraud, protect civil liberties and individual rights, ensure executive compliance with the law, gather information for making laws and educating the public, and evaluate executive performance.</p>

                <p>There are also independent agencies such as the United States Postal Service (USPS), the National Aeronautics and Space Administration (NASA), the Central Intelligence Agency (CIA), the Environmental Protection Agency (EPA), and the United States Agency for International Development (USAID). In addition, there are government-owned corporations such as the Federal Deposit Insurance Corporation and the National Railroad Passenger Corporation.</p>
            </div>
        )
    }
}

export default connect()(Home)