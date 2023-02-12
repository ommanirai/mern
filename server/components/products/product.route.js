const authenticate = require('./../../middlewares/authenticate')
const productController = require('./product.controller')
const router = require('express').Router()
const uploader = require('./../../middlewares/uploader')


router.route('/')
    .get(authenticate, productController.get)
    .post(authenticate, uploader.array('image'), productController.insert)

router.route('/search')
    .get(productController.search)
    .post(productController.search)

router.route('/add-review/:product_id')
    .post(authenticate, productController.addReview)

router.route('/:id')
    .get(authenticate, productController.getById)
    .put(authenticate, uploader.array('image'), productController.update)
    .delete(authenticate, productController.remove)




module.exports = router;
