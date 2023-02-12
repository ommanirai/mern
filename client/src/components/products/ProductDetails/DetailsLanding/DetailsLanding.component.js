import React, { Component } from 'react'
import { fetchSingleProduct_ac, addReview_ac } from '../../../../actions/products/product.action'
import AddReview from '../AddReview/AddReview.component'
import { Details } from '../Details/Details.component'
import { Loader } from './../../../Auth/Common/Loader/Loader.component'

class DetailsLandingComponent extends Component {
  // constructor() {
  //   super()

  //   this.state = {
  //      isLoading: false,
  //      product: {}
  //   }
  // }

  componentDidMount() {
    this.productId = this.props.match.params['id'];
    this.props.fetch_single_product(this.productId)
  }

  AddReview = (reviewData) => {
    this.props.add_review(this.productId, reviewData)
  }

  render() {
    if (this.props.isLoading) {
      return <Loader></Loader>
    }
    return (
      <>
        <Details productData={this.props.product}></Details>
        <AddReview AddReview={this.AddReview} ></AddReview>
      </>
    )
  }
}

const mapStateToProps = (rootStore) => ({
  product: rootStore.products.product,
  isLoading: rootStore.products.isLoading
})

const mapDispatchToProps = (dispatch) => ({
  fetch_single_product: (id) => dispatch(fetchSingleProduct_ac(id)),
  add_review: (id, data) => dispatch(addReview_ac(id, data))
})

export const DetailsLanding = connect(mapStateToProps, mapDispatchToProps)(DetailsLandingComponent)
