const express = require('express')
const router = express.Router()
const marketController = require('../controllers/market.controller')
const auth = require('../middlewares/authJwt')

router.use(auth.authentication)
router.use(auth.authorization)
router.get('/', marketController.getAll)
router.post('/', auth.idIsValid ,marketController.createMarket)
router.get('/:id', marketController.getOne)
router.put('/:id', marketController.updateMarket)
router.patch('/:id', marketController.pushMarket)
router.patch('/pull/:id', marketController.deleteMarketInUser)
router.delete('/:id', marketController.deleteMarket)
router.delete('/', marketController.deleteMany)

router.post('/collect/:id', marketController.collect)

module.exports = router