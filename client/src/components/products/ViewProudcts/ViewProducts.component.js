import React, { Component } from 'react'
import { handleError } from '../../../util/errorHandler'
import { httpClient } from '../../../util/httpClient'
import { notify } from '../../../util/toaster'
import { Loader } from '../../Auth/Common/Loader/Loader.component'
import { fetchProduct_ac, changePageNumber_ac, changePageSize_ac } from './../../../actions/products/product.action.js'
import { connect } from 'react-redux';


const IMG_URL = process.env.REACT_APP_IMG_URL
class ViewProductsComponent extends Component {
    // constructor() {
    //     super()

    //     this.state = {
    //         isLoading: false,
    //         products: []
    //     }
    // }

    componentDidMount() {
        // console.log('check props in view components', this.props)
        const { searchResults } = this.props
        if (searchResults) {
            this.setState({
                products: searchResults
            })
        }
        else {

            this.props.fetch({
                pageNumber: this.props.pageNumber,
                pageSize: this.props.pageSize
            });

        }
    }

    edit = (id) => {
        this.props.history.push(`/edit_product/${id}`);
    }

    remove = (id, index) => {
        let confirmation = window.confirm('Are you sure to remove?')
        if (confirmation) {
            httpClient.DELETE(`/product/${id}`, true)
                .then(response => {
                    notify.showInfo('Product Deleted')
                    const { products } = this.state;
                    products.splice(index, 1);
                    this.setState({
                        products
                    })
                })
                .catch(err => {
                    handleError(err);
                })
        }
    }


    changePage = (val) => {
        // console.log('val', val)
        console.log('page number is: ', pageNumber)
        let { pageNumber, pageSize } = this.props;
        if (val === 'next') {
            pageNumber += 1
        }
        if (val === 'prev') {
            pageNumber -= 1
        }
        this.props.fetch({
            pageNumber,
            pageSize
        })
        this.props.changePage(pageNumber);
    }


    render() {
        // let content = this.state.isLoading
        let content = this.props.isLoading
            // ?
            ? <Loader></Loader>
            :
            <><table className='table table-bordered table-hover'>
                <thead>
                    <tr>
                        <th>S.N</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Created At</th>
                        <th>Images</th>
                        {
                            !this.props.searchResults && (
                                <th>Actions</th>
                            )
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        // this.state.products.map((item, index) => {
                        this.props.products.map((item, index) => {
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><Link to={`/product_details/${item._id}`}>{item.name}</Link></td>
                                <td>{item.category}</td>
                                <td>{item.price}</td>
                                <td>{formatDate(item.createdAt, 'ddd YYYY/MM/DD')}</td>
                                {/* hh: mm:ss a => for hour, minute and second*/}
                                <td>
                                    <img src={`${IMG_URL}/${item.images[0]}`} alt='product image.png' width={'200px'}></img>
                                </td>
                                {
                                    !this.props.searchResults && (
                                        <td>
                                            <button onClick={() => this.edit(item._id)} className='btn btn-info'>edit</button>
                                            <button onClick={() => this.remove(item._id, index)} className='btn btn-danger'>delete</button>
                                        </td>
                                    )
                                }
                            </tr>
                        })
                    }
                </tbody>
            </table>
                {
                    this.props.pageNumber !== 1 && (
                        <button onClick={() => this.changePage('prev')} className='btn btn-success'>previous</button>
                    )
                }
                <button onClick={() => this.changePage('next')} className='btn btn-success'>next</button>
            </>

        return (
            <>
                <h2>View Products</h2>
                {
                    this.props.searchResults && this.props.searchResults.length > 0 && (
                        <button onClick={this.props.resetSearch} className="btn btn-success">Search Again</button>
                    )
                }
                {
                    content
                }
            </>
        )
    }
}
// mapStateToProps
// incoming data from store inside a component as props
const mapStateToProps = rootStore => ({
    isLoading: rootStore.products.isLoading,
    products: rootStore.products.products,
    pageNumber: rootStore.products.pageNumber,
    pageSize: rootStore.products.pageSize
})

// mapDispatchToProps
// outgoing events as an props
const mapDispatchToProps = dispatch => ({
    fetch: (condition) => dispatch(fetchProduct_ac(condition)),
    changePage: (pageNumber) => dispatch(changePageNumber_ac(pageNumber)),
    changePageSize: (pageSize) => dispatch(changePageSize_ac(pageSize))
})

export const ViewProducts = connect({ mapStateToProps }, { mapDispatchToProps })(ViewProductsComponent)