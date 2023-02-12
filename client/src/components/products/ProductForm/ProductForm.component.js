import React, { Component } from 'react'
import { Button } from './../../Auth/Common/Button/Button.component'

const IMG_URL = process.env.REACT_APP_IMG_URL

// rcc
// rconst

const defaultForm = {
    name: '',
    description: '',
    brand: '',
    category: '',
    price: '',
    color: '',
    modelNo: '',
    tags: '',
    offers: '',
    warrentyStatus: '',
    warrentyPeriod: '',
    size: '',
    discountedItem: '',
    discountType: '',
    discountValue: ''
}

export class ProductForm extends Component {
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
            filesToUpload: []
        }
    }

    componentDidMount() {
        const productData = this.props.productData
        if (productData) {
            this.setState({
                data: {
                    ...defaultForm,
                    ...productData,
                    discountedItem: productData.discount
                        ? productData.discount.discountedItem
                        : '',

                    discountType: productData.discount
                        ? productData.discount.discountType
                            ? productData.discount.discountType
                            : ''
                        : '',

                    discountValue: productData.discount
                        ? productData.discount.discountValue
                            ? productData.discount.discountValue
                            : ''
                        : ''
                },
                // filesToUpload: productData.images || []
            })
        }
    }

    handleChange = (e) => {
        // files -> jaile pani array hunxa
        let { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            // console.log('files: ', files)
            const { filesToUpload } = this.state;
            filesToUpload.push(files[0]);
            return this.setState({
                filesToUpload
            })
        }
        if (type === 'checkbox') {
            value = checked;
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

    validateForm = (fieldName) => {
        let errMsg;
        switch (fieldName) {
            case 'category':

            case 'name':
                errMsg = this.state.data[fieldName]
                    ? ''
                    : 'required field'
                break;
            case 'price':
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


    handleSubmit = (e) => {
        e.preventDefault()
        this.props.submitCallback(this.state.data, this.state.filesToUpload);
    }



    render() {
        const { productData } = this.props;
        let discountContent = this.state.data.discountedItem
            ?
            <>
                <br />
                <label>Discount Type</label>
                <select name='discountType' onChange={this.handleChange} className='form-control' value={this.state.data.discountType}>
                    <option disabled value={''}>Select Type</option>
                    <option value="percentage">Percentage</option>
                    <option value="quantity">Quantity</option>
                    <option value="value">Value</option>
                </select>

                <label>Discount Value</label>
                <input type={'text'} value={this.state.data.discountValue} name='discountValue' placeholder='Discount Value' onChange={this.handleChange} className='form-control' />
            </>
            : null;


        const imageData = productData && productData.images && productData.images.length ?
            <>
                <label>Previous Images</label>
                <br />
                {
                    productData.images.map((image, index) => {
                        <React.Fragment key={index}>
                            <img style={{ display: 'block' }} src={`${IMG_URL}/${image}`} alt="product_image.png" width={'180px'}></img>
                            {/* <button>close icon</button> */}
                            <hr />
                        </React.Fragment>

                    })
                }
                <br />
            </>
            : null;



        return (
            // react fragment
            // <>

            // </>
            <React.Fragment>
                <h2>{this.props.title}</h2>
                <form onSubmit={this.handleSubmit} className='form-group'>
                    <label>Name</label>
                    <input type={'text'
                    } name='name' value={this.state.data.name} placeholder='Name' onChange={this.handleChange} className='form-control' />

                    <label>Description</label>
                    <textarea rows={5} name='description' placeholder='Description' value={this.state.data.description} onChange={this.handleChange} className='form-control' />

                    <label>Brand</label>
                    <input type={'text'} value={this.state.data.brand} name='brand' placeholder='Brand' onChange={this.handleChange} className='form-control' />

                    <label>Category</label>
                    <input type={'text'} value={this.state.data.category} name='category' placeholder='Category' onChange={this.handleChange} className='form-control' />

                    <label>Price</label>
                    <input type={'number'} name='price' onChange={this.handleChange} className='form-control' value={this.state.data.price} />

                    <label>Color</label>
                    <input type={'text'} name='color' placeholder='Color' onChange={this.handleChange} className='form-control' value={this.state.data.color} />

                    <label>ModelNo</label>
                    <input type={'text'} name='modelNo' placeholder='Model Number' onChange={this.handleChange} className='form-control' value={this.state.data.modelNo} />

                    <label>Tags</label>
                    <input type={'text'} name='tags' placeholder='Tags' onChange={this.handleChange} value={this.state.data.tags} className='form-control' />

                    <label>Offers</label>
                    <input type={'text'} name='offers' placeholder='Offers' onChange={this.handleChange} value={this.state.data.offers} className='form-control' />

                    <input type={'checkbox'} checked={this.state.data.warrentyStatus} name='warrentyStatus' onChange={this.handleChange} />
                    <label style={{ marginLeft: '10px' }}>Warrenty Status</label>
                    <br />
                    {
                        this.state.data.warrentyStatus
                            ?
                            <>
                                <label>Warrenty Period</label>
                                <input type={'text'} value={this.state.data.warrentyPeriod} name='warrentyPeriod' placeholder='Warrenty Period' onChange={this.handleChange} className='form-control' />
                            </>
                            : null
                    }

                    <label>Size</label>
                    <input type={'text'} name='size' placeholder='Size' onChange={this.handleChange} value={this.state.data.size} className='form-control' />

                    <input type={'checkbox'} value={this.state.data.discountedItem} name='discountedItem' onChange={this.handleChange} />
                    <label>Discounted Item</label>
                    {discountContent}
                    <br />
                    {
                        imageData
                    }
                    <label>Select Image</label>
                    <input className='form-control' type={'file'} onChange={this.handleChange}></input>

                    <Button
                        isDisabled={!this.state.isValidForm}
                        isSubmitting={this.props.isSubmitting}
                    >
                    </Button>
                </form>
            </React.Fragment>
        )
    }
}
