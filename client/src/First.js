import * as React from 'react'
import { Link } from 'react-router-dom'
import './first.css'
import Navbar from './Navbar'


const First = () => {
    return (
        <>
            <h1>This is the first page of our site.</h1>
            <div className='text-center'>
                <Link to="/">go to home page.</Link>
            </div>
        </>
    )
}

export default First