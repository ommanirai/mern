import React from "react";
import './Header.component.css'
import { Link, withRouter } from "react-router-dom";


const HeaderComponent = (props) => {

    const logout = () => {
        localStorage.clear();
        // todo navigate to login page 
        // props.history.push('/') // push to login component
    }

    const currentUser = JSON.parse(localStorage.getItem('user'))

    // console.log("props in header: ", props)
    const content = props.isLoggedIn
        // Login xa vane
        ? <ul className="header-list">
            <li className="header-item a">
                <Link to={'/home'}>Home</Link>
            </li>
            <li className="header-item a">
                <Link to={'/about'}>About</Link>
            </li>
            <li className="header-item a">
                <Link to={'/contact'}>Contact</Link>
            </li>
            <li className="header-item logout">
                {/* <Link to={'/'}>Logout</Link> */}
                <button className="btn btn-success logout" onClick={logout}>Logout</button>
            </li>
            <li className="user-info">
                <p>{currentUser.username}</p>
            </li>
        </ul>
        // Login xaina vane
        : <ul className="header-list">
            <li className="header-item">
                <Link to={'/home'}>Home</Link>
            </li>
            <li className="header-item">
                <Link to={'/register'}>Register</Link>
            </li>
            <li className="header-item">
                <Link to={'/login'}>Login</Link>
            </li>
        </ul>
    return (
        <div className="header">
            {content}
        </div>
    )
}

// export const Header = withRouter(HeaderComponent) // yo garepaxi props in header ma history, match ra location paainxa
export const Header = HeaderComponent