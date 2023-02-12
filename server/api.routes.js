const router = require('express').Router();

const authRouter = require('./controllers/auth.controller')
const userRouter = require('./controllers/user.controller')
const productRouter = require('./components/products/product.controller')

const authenticate = require('./middlewares/authenticate')

router.user('/auth', authRouter)
router.user('/user', authenticate, userRouter)
router.user('/product', productRouter)

module.exports = router;
