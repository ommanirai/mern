import React, { Component } from 'react'


export default class AddReview extends Component {
    constructor() {
        super()

        this.state = {
            data: {
                reviewPoint: '',
                reviewMessage: '',
            },
            isSubmitting: false
        }
    }

    handleChange = e =>{
        const {name, value} = e.target;
        this.setState((pre)=>({
            data: {
                ...pre.data,
                [name]: value
            }
        }))
    }

    handleSubmit = e =>{
        e.preventDefault();
        this.props.AddReview(this.state.data)
        // redux way of calling API
    }


    render() {
        return (
            <>
                <h2>Add Rating</h2>
                <form className='form-group' onSubmit={this.handleSubmit}>
                    <label>Point</label>
                    <input className='form-control' type={'number'} min={'1'} max={'5'} name='reviewPoint' onChange={this.handleChange}></input>

                    <label>Message</label>
                    <input className='form-control' type={'text'} name='reviewMessage' onChange={this.handleChange} placeholder='review message here'></input>

                    <Button
                        isSubmitting={this.state.isSubmitting}
                        isDisabled={!(this.state.data.reviewMessage && this.state.data.reviewPoint)}
                    >
                    </Button>
                </form>
            </>
        )
    }
}
