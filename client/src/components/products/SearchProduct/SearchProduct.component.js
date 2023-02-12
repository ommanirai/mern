import React, { Component } from 'react'
import { handleError } from '../../../util/errorHandler'
import { httpClient } from '../../../util/httpClient'
import { notify } from '../../../util/toaster'
import { Button } from '../../Auth/Common/Button/Button.component'
import ViewProducts from '../ViewProudcts/ViewProducts.component'

const defaultForm = {
    name: '',
    category: '',
    brand: '',
    color: '',
    minPrice: '',
    maxPrice: '',
    tags: '',
    fromDate: '',
    toDate: '',
    multipleDateRange: ''
}

export default class SearchProduct extends Component {
    constructor() {
        super()

        this.state = {
            data: {
                ...defaultForm
            },
            error: {
                ...defaultForm
            },
            isValidForm: false,
            isSubmitting: false,
            allProducts: [],
            categories: [],
            categoryWiseSelectedProducts: [],
            searchResults: []
        }
    }


    componentDidMount() {
        httpClient.POST('/product/search', {})
            .then(response => {
                // console.log('all products: ', response.data)
                let cats = []
                response.data.forEach((item, index) => {
                    if (!cats.includes(item.category)) {
                        cats.push(item.category)
                    }
                })
                this.setState({
                    allProducts: response.data,
                    categories: cats
                })
            })
            .catch(err => {
                handleError(err);
            })
    }

    handleChange = e => {
        let { name, value, type, checked } = e.target;
        if (type === 'checked') {
            value = checked
        }
        if (name === 'category') {
            this.prepareNames(value);
        }
        this.setState(pre => ({
            data: {
                ...pre.data,
                [name]: value
            }
        }), () => {
            this.validateForm(name);
        })
    }

    prepareNames = selectedCategory => {
        const names = this.state.allProducts.filter(item => item.category === selectedCategory);
        this.setState({
            categoryWiseSelectedProducts: names
        })
    }

    validateForm = fieldName => {
        let errMsg;
        switch (fieldName) {
            case 'category':
            case 'name':
                errMsg = this.state.data[fieldName]
                    ? ''
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
            const errors = Object.values(this.state.error)
                .filter(err => err);

            this.setState({
                isValidForm: errors.length === 0
            })
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.setState({
            isSubmitting: true
        })
        const { data } = this.state;
        if (!data.multipleDateRange) {
            data.toDate = data.fromDate;
        }
        // api call
        httpClient.POST('/product/search', this.state.data)
            .then(response => {
                if (!response.data.length) {
                    notify.showInfo('No any product matched your search query')
                }
                // TODO present the search data
                this.setState({
                    searchResults: response.data
                })
            })
            .catch(err => {
                handleError(err);
            })
            .finally(() => {
                this.setState({
                    isSubmitting: false
                })
            })
    }


    reset = () => {
        this.setState({
            data: {
                ...defaultForm
            },
            searchResults: []
        })
    }


    render() {
        let content = this.state.searchResults.length > 0
            ? <ViewProducts
                searchResults={this.state.searchResults}
                resetSearch={this.reset}
            >
            </ViewProducts>
            : <>
                <h2>Search Product</h2>
                <form className='form-group' onSubmit={this.handleSubmit} noValidate>
                    <label>Category</label>
                    <select name='category' onChange={this.handleChange} className='form-control' value={this.state.data.category}>
                        <option value="">(Select Category)</option>
                        {
                            this.state.categories.map((cat, index) => {
                                <option key={index} value={cat}>{cat}</option>
                            })
                        }
                    </select>
                    {
                        this.state.categoryWiseSelectedProducts.length > 0 && (
                            <>
                                <label>Name</label>
                                <select name='name' onChange={this.handleChange} className='form-control' value={this.state.data.name}>
                                    <option value="">(Select Name)</option>
                                    {
                                        this.state.categoryWiseSelectedProducts.map((selectedCategory, index) => {
                                            <option key={index} value={selectedCategory.name}>{selectedCategory.name}</option>
                                        })
                                    }
                                </select>
                            </>
                        )
                    }

                    <label>Brand</label>
                    <input type={'number'} name="brand" onChange={this.handleChange} className="form-control" placeholder='Brand'></input>

                    <label>Min Price</label>
                    <input type={'number'} name="minPrice" onChange={this.handleChange} className="form-control" placeholder='Minimum Price'></input>

                    <label>Max Price</label>
                    <input type={'number'} name="maxPrice" onChange={this.handleChange} className="form-control" placeholder='Maximum Price'></input>

                    <label>Tags</label>
                    <input type={'number'} name="tags" onChange={this.handleChange} className="form-control" placeholder='Tags'></input>

                    <label>Select Date</label>
                    <input type={'number'} name="fromDate" onChange={this.handleChange} className="form-control" placeholder='From Date'></input>
                    <input type={'checkbox'} name='multipleDateRange' onChange={this.handleChange}></input>
                    <label>Multiple Date Range</label>
                    <br />
                    {
                        this.state.data.multipleDateRange && (
                            <>
                                <label>To Date</label>
                                <input type={'number'} name="toDate" onChange={this.handleChange} className="form-control" placeholder='ToDate'></input>
                            </>
                        )
                    }

                    <label>Color</label>
                    <input type={'number'} name="color" onChange={this.handleChange} className="form-control" placeholder='Color'></input>

                    <Button
                        isSubmitting={this.state.isSubmitting}
                        isDisabled={!this.state.isValidForm}
                    ></Button>
                </form>
            </>
        return content;
    }
}
