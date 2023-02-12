import React from 'react'
import './Sidebar.component.css'
import { Link } from 'react-router-dom'

export const Sidebar = (props) => {
    return props.isLoggedIn ?
        <div className='sidebar'>
            <Link to={'/dashboard'} className='sidebar-item'>Dashboard</Link>
            <Link to={'/add_product'} className='sidebar-item'>Add Product</Link>
            <Link to={'/view_products'} className='sidebar-item'>View Product</Link>
            <Link to={'/search_product'} className='sidebar-item'>Search Product</Link>
            <Link to={'/chat'} className='sidebar-item'>Let's Chat (Message)</Link>
            <Link to={'/profile'} className='sidebar-item'>Profile</Link>
        </div>
        : null
}