import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Home = () => {
    return (
        <>
            <h1>This is the home page of our site.</h1>
            {/* This Link is from the react-router-dom */}
            <div className='text-center'>
                <Link to="/first">go to first page.</Link>
            </div>
        </>
    )
}

export default Home