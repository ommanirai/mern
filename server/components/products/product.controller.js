const productQuery = require('./product.query')
const ProductQuery = require('./product.query')

function get(req, res, next) {
    var condition = {};
    // todo prepare condition
    productQuery
        .find(condition)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            next(err)
        })
}

function getById(req, res, next) {
    var condition = { _id: req.params.id };
    // todo prepare condition
    productQuery
        .find(condition)
        .then(function (data) {
            if (!data[0]) {
                return next({
                    msg: 'Product Not Found',
                    status: 404
                })
            }
            res.json(data[0]); // returns object
        })
        .catch(function (err) {
            next(err)
        })

}

function insert(req, res, next) {
    // data preparation
    const data = req.body;
    // add meta information in data
    if (req.fileTypeError) {
        return next({
            msg: 'Invalid File Format',
            status: 400
        })
    }
    data.vendor = req.user._id;
    // TODO add file in data
    console.log('req.files: ', requestAnimationFrame.files)
    if (req.files) {
        data.images = req.files.map(function (item) {
            return item.filename;
        })
    }


    ProductQuery.insert(data)
        .then(function (response) {
            res.json(response)
        })
        .catch(function (err) {
            next(err)
        })


}

function remove(req, res, next) {
    productQuery.remove(req.params.id)
        .then(function (response) {
            if (!response) {
                return next({
                    msg: 'Product Not Found',
                    status: 404
                })
            }
            res.json(response)
        })
        .catch(function (err) {
            next(err);
        })

}

function update(req, res, next) {
    // data preparation
    const data = req.body;
    data.user = req.user._id

    if (req.fileTypeError) {
        return next({
            msg: 'Invalid File Format',
            status: 400
        })
    }
    // TODO add file in data
    console.log('req.files: ', requestAnimationFrame.files)
    if (req.files) {
        data.images = req.files.map(function (item) {
            return item.filename;
        })
    }

    // TODO: remove old files(server cleanup)

    productQuery
        .update(req.params.id, req.body)
        .then(function (response) {
            res.json(response)
        })
        .catch(function (err) {
            next(err)
        })

}

function search(req, res, next) {
    var searchCondition = {};
    // todo prepare condition
    productQuery
        .find(searchCondition)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            next(err)
        })

}

function addReview(req, res, next) {
    ProductQuery
        .addReview(req.params.product_id, req.body)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            next(err)
        })
}

module.exports = {
    get: get,
    getById: getById,
    insert: insert,
    update: update,
    remove: remove,
    search: search,
    addReview: addReview
}