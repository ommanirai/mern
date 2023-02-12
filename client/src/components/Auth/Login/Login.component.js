import React, { Component } from 'react'
import { Button } from '../Common/Button/Button.component';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { httpClient } from '../../../util/httpClient';
import { handleError } from '../../../util/errorHandler';
import { notify } from '../../../util/toaster';
// import axios from 'axios'

// const BaseURL = process.env.REACT_APP_BASE_URL // restart nagari kana env file ko changes trigger gardaina detect gardaina

const defaultForm = {
    username: '',
    password: ''
}
// class based component
export class Login extends Component {
    // or export class Login extends React.Component
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            // username: '',
            // password: '',
            // usernameErr: '',
            // passwordErr: '',
            remember_me: false,
            isValidForm: false,
            isSubmitting: false,
            type: 'password',
            showPassword: false
        } // class based component ko main kura vaneko state maintain garne ho so state maintain garna laai suruma initial state vanera define garna parxa this.state
    }

    componentDidMount() {
        // console.log('localstorage: ', localStorage.getItem('remember_me'));
        // var isLoggedIn = Boolean(localStorage.getItem('remember_me'));
        // console.log('is logged in: ', typeof (isLoggedIn));
        // if (isLoggedIn) {
        //     this.props.history.push('/dashboard/js')
        // }
        var remember_me = localStorage.getItem('remember_me')
        if (remember_me === 'true') {
            // this.props.history.push('/dashboard/js')
        }
    }

    handleChange = (event) => {
        // console.log('event: ', event)
        // console.log('event: ', event.target)
        let { name, value, type, checked } = event.target
        // console.log("name is:", name)
        // console.log('value is: ', value)
        if (type === 'checkbox') {
            // console.log('checked: ', checked)
            // value = checked;
            return this.setState({
                remember_me: checked
            })
        }
        // async
        // this.setState({
        //     [name]: value
        // }, () => {
        //     // state modify vayo ki vayena vanera check garna ko lagi callback use gareko
        //     // console.log('state now', this.state)
        //     this.validateForm(name)
        // })
        // console.log('this.state', this.state)

        this.setState(pre => ({
            data: {
                ...pre.data, // previous state ko data j xa tei
                [name]: value // dynamic name with value j aako xa tei
            }
        }), () => {
            this.validateForm(name)
        })
    }

    // showPassword = (show = false) => {
    //     this.setState({
    //         type: show ? 'text' : 'password'
    //     })
    // }

    // showPassword = () => {
    //     const { type } = this.state;
    //     let changeType;
    //     if (type === 'text') {
    //         changeType = 'password'
    //     }
    //     if (type === 'password') {
    //         changeType = 'text'
    //     }
    //     this.setState({
    //         type: changeType
    //     })
    // }

    showPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
    }

    validateForm = fieldName => {
        let errMsg = this.state.data[fieldName]
            ? ''
            : 'required field'
        // let errField = fieldName + 'Err'
        // this.setState({
        //     [errField]: errMsg
        // })
        this.setState(pre => ({
            error: {
                ...pre.error,
                [fieldName]: errMsg
            }
        }), () => {
            const errors = Object.values(this.state.error)
                .filter(err => err)

            this.setState({
                isValidForm: errors.length === 0
            })
        })
    }

    handleSubmit = (e) => {
        toast.success('Login in Progress')
        e.preventDefault()
        this.setState({
            isSubmitting: true
        })
        // console.log('this.state', this.state)
        // API Call
        // send data to server

        // setTimeout(() => {
        //     toast.error('Login failed')
        //     this.setState({
        //         isSubmitting: false
        //     })
        //     // console.log('type check: ', typeof this.state.remember_me)
        //     localStorage.setItem('remember_me', this.state.remember_me)
        //     // this.props.history.push('/home')
        //     this.props.history.push({
        //         // pathname:'/home',
        //         pathname: '/dashboard/ommanirai',
        //         state: { name: 'ommani' }
        //     })
        //     // set into localstorage once API call is successfull

        // }, 3000);


        // axios.post(`${BaseURL}/auth/login`, this.state.data, {
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     responseType: 'json'
        // })
        httpClient.POST('/auth/login', this.state.data)
            .then((response) => {
                console.log('response is: ', response)
                // TODO
                // localstorage setup
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                localStorage.setItem('remember_me', this.state.remember_me)
                // navigate to dashboard
                this.props.history.push('/dashboard')
                // show proper toast message
                notify.showSuccess(`Welcome ${response.data.user.username}`)
            })
            .catch((err) => {
                console.log('error is: ', err.response)
                // TODO create utility file to handle error
                // toast.error(err.response.data.msg)
                handleError(err)
                this.setState({
                    isSubmitting: false
                })
            })
    }

    render() {
        // console.log('render called')
        // render garnu vaneko hamro content lai browser ma display garnu ho
        // render method is mandatory
        // render method must return single html node

        // UI logic goes here

        return (
            <div>
                <h2>Login</h2>
                <p>Please login to start your session</p>

                <form className='form-group' onSubmit={this.handleSubmit.bind(this)}>
                    {/* yoo bind garnu vaneko context supply garnu ho */}
                    <div className='form-floating'>
                        <input className='form-control' type="text" name="username" id="username" placeholder='Username'
                            onChange={this.handleChange} />
                        <p className='text-danger'>{this.state.error.username}</p>
                        <label htmlFor='username'>Username</label>
                    </div>
                    <br />

                    <div className='form-floating'>
                        {/* <input className='form-control' type={this.state.type} name="password" id="password" placeholder='password' */}
                        <input className='form-control' type={this.state.showPassword ? 'text' : 'password'} name="password" id="password" placeholder='password'
                            onChange={this.handleChange} />
                        <p style={{ cursor: 'pointer', color: 'blue' }} onClick={this.showPassword}>
                            {/* {this.state.type === 'password' ? "show" : 'hide'} Password */}
                            {this.state.showPassword ? "hide" : 'show'} Password
                        </p>
                        <p className='text-danger'>{this.state.error.password}</p>

                        <label htmlFor='password'>Password</label>
                    </div>

                    <input id='remember_me' type={'checkbox'} name='remember_me' onChange={this.handleChange}></input>
                    <label style={{ marginLeft: '10px' }} htmlFor='remember_me'>Remember Me</label>
                    <br />

                    <Button
                        isSubmitting={this.state.isSubmitting}
                        // isDisabled={!(this.state.username && this.state.password)}
                        isDisabled={!this.state.isValidForm}
                        disabledLabel='Submited by Ommani'
                        enabledLabel='submit Ommani'
                    ></Button>

                </form>
                <p>Don't have an account?</p>
                <p style={{ float: 'left' }}>Register <Link to='/register'>here</Link></p>
                <p style={{ float: 'right' }}> <Link to='/forgot_password'>Forgot Password</Link></p>
            </div>
        )
    }
}
