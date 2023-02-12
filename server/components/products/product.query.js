const ProductModel = require('./product.model')

function map_product_req(product, productDetails) {
    if (productDetails.name) {
        product.name = productDetails.name
    }

    if (productDetails.category) {
        product.category = productDetails.category
    }

    if (productDetails.brand) {
        product.brand = productDetails.brand
    }

    if (productDetails.price) {
        product.price = productDetails.price
    }

    if (productDetails.color) {
        product.color = productDetails.color
    }

    if (productDetails.modelNo) {
        product.modelNo = productDetails.modelNo
    }

    if (productDetails.tags) {
        product.tags = productDetails.tags
    }

    if (productDetails.offers) {
        product.offers = productDetails.offers
    }

    if (productDetails.vendor) {
        product.vendor = productDetails.vendor
    }

    if (productDetails.images) {
        product.images = productDetails.images
    }

    if (productDetails.warrentyStatus) {
        product.warrentyStatus = productDetails.warrentyStatus
    }

    if (productDetails.warrentyPeriod) {
        product.warrentyPeriod = productDetails.warrentyPeriod
    }

    if (productDetails.size) {
        product.size = productDetails.size
    }

    if (productDetails.description) {
        product.description = productDetails.description
    }

    if (!product.discount)
        product.discount = {};

    if (productDetails.discountedItem) {
        product.discount.discountedItem = productDetails.discountedItem
    }

    if (productDetails.discountType) {
        product.discount.discountType = productDetails.discountType
    }

    if (productDetails.discountValue) {
        product.discount.discountValue = productDetails.discountValue
    }

    if (productDetails.reviewMessage && productDetails.reviewPoint) {
        var reviews = {
            message: productDetails.reviewMessage,
            point: productDetails.reviewPoint,
            user: productDetails.user
        }
        product.reviews.push(reviews);
    }

    return product;
}

function find(condition) {
    // return new Promise(function (resolve, reject) {

    //     ProductModel.find(condition)
    //         // promise
    //         .then(function (data) {
    //             resolve(data)
    //             console.log('data: ', data)
    //         })
    //         .catch(function (err) {
    //             reject(err)
    //             console.log('err: ', err)
    //         })
    //     // callback
    // })

    return ProductModel
        .find(condition)
        .populate('vendor', {
            username: 1,
            email: 1
        })
        .populate('reviews.user', {
            username: 1
        })


}

function insert(data) {
    const newProudct = new ProductModel({});
    const mappedProduct = map_product_req(newProudct, data)
    return mappedProduct.save();
}

function update(id, data) {
    return new Promise(function (resolve, reject) {
        ProductModel.findById(id, function (err, product) {
            if (err) {
                return next(err)
            }
            if (!product) {
                return next({
                    msg: 'Product Not Foune',
                    status: 404
                })
            }
            var updatedProduct = map_product_req(product, data);

            updatedProduct.save(function (err, done) {
                if (err) {
                    return reject(err);
                }
                resolve(done);
            })



        })
    })


}

function remove(id) {
    return ProductModel.findByIdAndRemove(id)

}

function addReview(productId, data) {
    return new Promise(function (resolve, reject) {
        ProductModel.findById(productId, function (err, product) {
            if (err) {
                return next(err)
            }
            if (!product) {
                return next({
                    msg: 'Product Not Foune',
                    status: 404
                })
            }
            if (data.reviewMessage && data.reviewPoint) {
                var reviews = {
                    message: data.reviewMessage,
                    point: data.reviewPoint,
                    user: data.user
                }
                product.reviews.push(reviews);
            }

            product.save(function (err, done) {
                if (err) {
                    return reject(err);
                }
                resolve(done);
            })
        })
    })

}

module.exports = {
    find: find,
    insert: insert,
    update: update,
    remove: remove,
    addReview: addReview
}