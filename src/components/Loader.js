import React from 'react';
import blueFlag from '../flag.svg'
import redFlag from '../red-tone-flag.svg'
import flag from '../true-color-flag.svg'

const Loader = () => {
    const images = [blueFlag, redFlag, flag]


    return  <>
            <h3>Content Loading, please wait...</h3>
            <img src={images[Math.floor(Math.random()*images.length)]} alt='American flag' className='loader'/>
            </>
}

export default Loader