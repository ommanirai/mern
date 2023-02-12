import React, { Component } from 'react'
import { ProductForm } from '../ProductForm/ProductForm.component'
import { httpClient } from './../../../util/httpClient'

export class AddProduct extends Component {
    constructor() {
        super()

        this.state = {
            isSubmitting: false
        }
    }

    add = (data, files) => {
        // console.log("add in add product component: ", data)
        this.setState({
            isSubmitting: true
        })
        // httpClient.POST('/product', data , true)
        httpClient.UPLOAD('POST','/product', data, files)
            .then(response => {
                notify.showSuccess('Product Added Successfully');
                this.props.history.push('/view_products');
            })
            .catch(err => {
                this.setState({
                    isSubmitting: false
                })
                handleError(err);
            })

    }
    render() {
        return (
            <div>
                <ProductForm
                    title='Add Product'
                    isSubmitting={this.state.isSubmitting}
                    submitCallback={this.add}
                >
                </ProductForm>
            </div>
        )
    }
}
