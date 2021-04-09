const express = require('express')
const router = express.Router()
const farmController = require('../controllers/farm.controller')
const auth = require('../middlewares/authJwt');
const errHanddler = require('../middlewares/errorHanddler');

router.use(auth.authentication);
router.use(auth.authorization)
router.get('/', farmController.getAll)
router.get('/:id', farmController.getOne)
router.post('/', farmController.createFarm)
router.put('/:id', farmController.updateFarm)
router.delete('/:id', farmController.deleteFarm)
router.use(errHanddler)

router.post('/collect/:id', farmController.collect)

module.exports = router