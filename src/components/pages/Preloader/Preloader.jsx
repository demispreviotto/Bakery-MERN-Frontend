import React from 'react'
import './Preloader.scss'
import Logo from '../../../assets/Logo'
const Preloader = () => {
    return (
        <div className='preloader'>
            <Logo fill={"#EAD6C2"} />
            <h1>BAKERY</h1>
            <h2>Lorem ipsum dolor sit.</h2>
        </div>
    )
}

export default Preloader