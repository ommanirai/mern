import React from 'react'
import { BrowserRouter, Routes, Route, Switch, Redirect } from 'react-router-dom'
import Chat from './Auth/Common/Chat/Chat.component'
import ForgotPassword from './Auth/ForgotPassword/ForgotPassword.componetn'
import { Login } from './Auth/Login/Login.component'
import { Register } from './Auth/Register/Register.component'
import { ResetPassword } from './Auth/ResetPassword/ResetPassword.component'
import { Header } from './Header/Header.component'
import { AddProduct } from './products/AddProduct/AddProduct.component'
import EditProduct from './products/EditProduct/EditProduct.component'
import DetailsLanding from './products/ProductDetails/DetailsLanding/DetailsLanding.component'
import SearchProduct from './products/SearchProduct/SearchProduct.component'
import ViewProducts from './products/ViewProudcts/ViewProducts.component'
import { Sidebar } from './Sidebar/Sidebar.component'

export const Home = (props) => {
    console.log('props in home: ', props);
    return <p>Home Page</p>
}

export const About = (props) => {
    return <p>About Page</p>
}

export const Contact = (props) => {
    return <p>Contact Page</p>
}

export const Dashboard = (props) => {
    console.log('props in Dashboard: ', props)
    return <>
        <h4>Welcome to Our Store</h4>
        <p>Please use side navigation menu or contact system administrator for support</p>
    </>
}

export const NotFound = (props) => {
    return (
        <div>
            <p>Not Found</p>
            <img src='./images/notfound.PNG' />
        </div>
    )
}
// render in react routing
const ProtectedRoute = ({ element: Element, ...rest }) => {
    return <Route {...rest} render={routeProps => (
        localStorage.getItem('token')
            ? <div>
                <Header isLoggedIn={true} />
                {/* <Sidebar isLoggedIn={true}></Sidebar> */}
                <div className='main'>
                    <Element {...routeProps}></Element>
                </div>
            </div>
            : <Redirect to='/'></Redirect>
    )}></Route>
}

const PublicRoute = ({ element: Element, ...rest }) => {
    return <Route {...rest} render={routeProps => (
        <div>
            <Header isLoggedIn={localStorage.getItem('token') ? true : false} />
            <Sidebar isLoggedIn={localStorage.getItem('token') ? true : false} />
            <div className='main'>
                <Element {...routeProps}></Element>
            </div>
        </div>
    )}></Route>
}

export const AppRouting = (props) => {
    return (
        <BrowserRouter>
            {/* <Header isLoggedIn={true} />
            <Sidebar /> */}
            <Routes>
                {/* <Switch> */}
                {/* switch le auta condition match vayo vane terminate gardinxa so NotFound Page sabai component ma aaudaina and if no any route is matches then only NotFound Page will render */}
                <PublicRoute><Route exact={true} path='/' element={<Login />}></Route></PublicRoute>

                <PublicRoute><Route path='/register' element={<Register />}></Route></PublicRoute>

                <PublicRoute><Route path='/forgot_password' element={<ForgotPassword />}></Route></PublicRoute>

                <PublicRoute><Route path='/reset_password/:token' element={<ResetPassword />}></Route></PublicRoute>



                <PublicRoute><Route path='/home' element={<Home />} /></PublicRoute>

                <ProtectedRoute><Route path='/about' element={<About />} /></ProtectedRoute>

                <ProtectedRoute><Route path='/contact' element={<Contact />} /></ProtectedRoute>

                <ProtectedRoute><Route path='/dashboard' element={<Dashboard />} /></ProtectedRoute>

                <ProtectedRoute><Route path='/add_product' element={<AddProduct />} /></ProtectedRoute>

                <ProtectedRoute><Route path='/view_products' element={<ViewProducts />} /></ProtectedRoute>

                <ProtectedRoute><Route path='/edit_proudct/:id' element={<EditProduct />} /></ProtectedRoute>

                <ProtectedRoute><Route path='/product_details/:id' element={<DetailsLanding />} /></ProtectedRoute>


                <ProtectedRoute><Route path='/search_proudct/:id' element={<SearchProduct />} /></ProtectedRoute>

                <ProtectedRoute><Route path='/chat' element={<Chat />} /></ProtectedRoute>



                <PublicRoute><Route element={<NotFound />} /></PublicRoute>
                {/* </Switch> */}
            </Routes>
        </BrowserRouter>
    )
}