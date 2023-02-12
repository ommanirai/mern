import React, { Component } from 'react'
import { handleError } from '../../../util/errorHandler'
import { httpClient } from '../../../util/httpClient'
import { notify } from '../../../util/toaster'
import { Loader } from '../../Auth/Common/Loader/Loader.component'
import { ProductForm } from '../ProductForm/ProductForm.component'

export default class EditProduct extends Component {
    constructor() {
        super()

        this.state = {
            isSubmitting: false,
            product: {},
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        this.productId = this.props.match.params['id']
        httpClient.GET(`/product/${this.productId}`, true)
            .then(response => {
                this.setState({
                    product: response.data
                })
            })
            .catch(err => {
                handleError(err)
            })
            .finally(() => {
                this.setState({
                    isLoading: false
                })
            })
    }

    edit = (data, files) => {
        this.setState({
            isSubmitting: true
        })
        // console.log('data in edit: ', data)
        // api call
        // httpClient.PUT(`/product/${this.productId}`, data, true)
        httpClient.UPLOAD('PUT', `/product/${this.productId}`, data, files)
            .then(response => {
                notify.showInfo('Product Updated Successfully')
                this.props.history.push('/view_products')
            })
            .catch(err => {
                handleError(err);
                this.setState({
                    isSubmitting: false
                })
            })
    }


    render() {
        let content = this.state.isLoading
            // ? <p>Show Loader</p>
            ? <Loader></Loader>
            : <ProductForm
                isSubmitting={this.state.isSubmitting}
                submitCallback={this.edit}
                title="Update Product"
                productData={this.state.product}
            ></ProductForm>
        return (
            <>
                {content}
            </>
        )
    }
}
