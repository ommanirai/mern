import React from 'react'
import './Details.component.css'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { formatDate } from '../../../../util/dateProcessing';


const IMG_URL = process.env.REACT_APP_IMG_URL


const defaultImages = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
        thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
];

const getImages = (imageNames) => {
    // console.log('imageNames: ', imageNames)
    let images = (imageNames || []).map(name => ({
        original: `${IMG_URL}/${name}`
    }))
    // console.log('images: ', images)
    return images.length ? images : defaultImages
}

export const Details = (props) => {
    // console.log('props is: ', props)
    const productData = props.productData || {};
    return (
        <div className='row'>
            <div className='col-md-6'>
                <div className='box'>
                    {/* <ImageGallery items={getImages(productData.images)} showThumbnails={false} /> */}
                </div>
            </div>
            <div className='col-md-6'>
                <div className='box'>
                    <p>Product Basic Details</p>
                    <p>Name:<strong> {props.productData.name}</strong></p>
                    <p>Price: {props.productData.price}</p>
                    <hr />
                    <h2>Reviews</h2>
                    {
                        (productData.reviews || []).map((review, index) => (
                            <div key={index}>
                                <p>show in star {review.point}</p>
                                <p>{review.message}</p>
                                <p>{review.user && review.user.username}</p>
                                <p>{formatDate(review.createdAt)}</p>
                                <hr />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
