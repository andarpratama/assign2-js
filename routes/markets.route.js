const express = require('express')
const router = express.Router()
const marketController = require('../controllers/market.controller')
const auth = require('../middlewares/authJwt')
const errHanddler = require('../middlewares/errorHanddler');

router.use(auth.authentication)
router.use(auth.authorization)
router.get('/', marketController.getAll)
router.post('/',marketController.createMarket)
router.get('/:id', marketController.getOne)
router.put('/:id', marketController.updateMarket)
router.delete('/:id', marketController.deleteMarket)
router.post('/collect/:id', marketController.collect)
router.use(errHanddler)

module.exports = router