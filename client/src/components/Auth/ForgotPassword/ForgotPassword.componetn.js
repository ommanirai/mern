import React, { Component } from 'react'
import { handleError } from '../../../util/errorHandler'
import { httpClient } from '../../../util/httpClient'
import { notify } from '../../../util/toaster'
import { Button } from '../Common/Button/Button.component'

export default class ForgotPassword extends Component {
    constructor() {
        super()

        this.state = {
            data: {
                email: ''
            },
            error: {
                email: ''
            },
            isSubmitting: false,
            isValidForm: false
        }
    }
    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            data: {
                [name]: value
            }
        }, () => {
            this.validateForm(name)
        })
    }

    validateForm = (fieldName) => {
        let errMsg = this.state.data.email
            ? this.state.data[fieldName].includes('@') && this.state.data[fieldName].includes('.com')
                ? 'invalid email'
                : ''
            : 'required field'

        this.setState({
            error: {
                [fieldName]: errMsg
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.setState({
            isSubmitting: true
        })
        httpClient.POST('/auth/forgot_password', this.state.data)
            .then(response => {
                notify.showInfo('Password Reset Link sent to your email please check your inbox')
                this.props.history.push('/')
            })
            .catch(err => {
                handleError(err)
                this.setState({
                    isSubmitting: false
                })
            })
    }


    render() {
        return (
            <>
                <h2>Forgot Password</h2>
                <p>Please provide your email address to reset your password</p>
                <form onSubmit={this.handleSubmit} className="form-group" noValidate>
                    <label>Email</label>
                    <input type={'text'} name='email' placeholder='Email Address' className='form-control' onChange={this.handleChange} />
                    <p className='text-danger'>{this.state.error.email}</p>
                    <Button
                        isSubmitting={this.state.isSubmitting}
                        isDisabled={!this.state.data.email && this.state.error.email}
                    >
                    </Button>
                </form>

            </>
        )
    }
}
