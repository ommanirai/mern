import React, { Component } from 'react'
import { Button } from '../Common/Button/Button.component';
import { Link } from 'react-router-dom';
import { httpClient } from '../../../util/httpClient';
import { notify } from '../../../util/toaster';
import { handleError } from '../../../util/errorHandler';
// import axios from 'axios'
// import toast from 'react-hot-toast'

// const BaseURL = 'http://localhost:8000/api'
const defaultForm = {
    password: '',
    confirmPassword: '',
}

export class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            isValidForm: false,
            isSubmitting: false
        }
        // console.log('constructor at first');
    }

    // init stage
    componentDidMount() {
        console.log('initial state once render is completed');
        // let i = 0
        // this.interval = setInterval(() => {
        //     i++;
        //     this.setState({
        //         chapter: i
        //     })
        // }, 1000);
        this.userId = this.props.match.params('token')
    }

    //update stage
    // componentDidUpdate(prevProps, prevState) {
    //     // console.log('once component data is changed that is either props or state');
    //     console.log('previous state: ', prevState.data);
    //     console.log('once component data is changed current state', this.state.data)
    // }

    // destroy
    componentWillUnmount() {
        console.log('once component is destroyed, component ko life cycle sakiyepaxi yo block run hunxa');
        // clearInterval(this.interval)
    }

    handleChange = e => {
        const { name, value } = e.target;
        // this.setState((previousState) =>({
        //     data:{
        //         [name]:value
        //     }
        // }), () =>{
        //     console.log('state is: ', this.state)
        // })

        this.setState(pre => ({
            data: {
                ...pre.data,
                [name]: value
            }
        }), () => {
            // console.log('this.state:', this.state.data)
            this.validateForm(name)
        })

    }

    validateForm = (fieldName) => {
        let errMsg;

        switch (fieldName) {
            case 'password':
                errMsg = this.state.data[fieldName]
                    ? this.state.data['confirmPassword']
                        ? this.state.data['confirmPassword'] === this.state.data[fieldName]
                            ? ''
                            : 'confirm password didnot match'
                        : this.state.data[fieldName].length > 8
                            ? ''
                            : 'weak password'
                    : 'required field*'
                break;
            case 'confirmPassword':
                errMsg = this.state.data[fieldName]
                    ? this.state.data['password']
                        ? this.state.data['password'] === this.state.data[fieldName]
                            ? ''
                            : 'password didnot match'
                        : this.state.data[fieldName].length > 8
                            ? ''
                            : 'weak password'
                    : 'required field'
                break;
            default:
                break;

        }

        this.setState(pre => ({
            error: {
                ...pre.error,
                [fieldName]: errMsg
            }
        }), () => {
            const errors = Object
                .values(this.state.error)
                .filter(err => err);
            // .filter(function(item){
            //     if(item){
            //         return true
            //     }
            // })
            // console.log('errors: ', errors)
            this.setState({
                // errors ko length 0 vayepaxi tyo valid form ho
                isValidForm: errors.length === 0
            })

        })
    }

    handleSubmit = e => {
        e.preventDefault() // html5 ko default behaviour lai prevent garna laai
        this.setState({
            isSubmitting: true
        })
        // api call
        // this.state.data (data)
        // axios.post(`${BaseURL}/auth/register`, this.state.data, {
        //     headers: {
        //         'Content-Type': 'application/json' // json parser hunu parxa
        //     },
        //     responseType: 'json',
        //     // params: {}
        // })
        httpClient.POST(`/auth/reset_password/${this.userId}`, this.state.data)
            .then((response) => {
                console.log('response is: ', response)
                // toast.success('Registration successfull please check your inbox to activate your accout')
                notify.showSuccess('Password Reset Successfull. Please Login to Continue')
                this.props.history.push('/')

            })
            .catch((err) => {
                // console.log('error is: ', err)
                handleError(err)
                this.setState({
                    isSubmitting: false
                })
            })
    }
    render() {
        console.log('render at second');
        return (
            <div>
                <h2>Reset Password</h2>
                {/* <p>Current chapter: {this.state.chapter}</p> */}
                <p>Please choose your password wisely</p>
                <form className='form-group' onSubmit={this.handleSubmit} noValidate>

                    <label>Password</label>
                    <input type={'password'} className='form-control' name="password" placeholder='Password' onChange={this.handleChange} />
                    <p className='text-danger'>{this.state.error.password}</p>

                    <label>Confirm Password</label>
                    <input type={'password'} className='form-control' name="confirmPassword" placeholder='Confirm Password' onChange={this.handleChange} />
                    <p className='text-danger'>{this.state.error.confirmPassword}</p>

                    <Button
                        isSubmitting={this.state.isSubmitting}
                        isDisabled={!this.state.isValidForm}
                    >
                    </Button>
                </form>
                <p>Back to <Link to='/'>Login</Link></p>
            </div>
        )
    }
}