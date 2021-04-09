const express = require('express')
const router = express.Router()
const farmController = require('../controllers/farm.controller')
const auth = require('../middlewares/authJwt');

router.use(auth.authentication);
router.get('/', farmController.getAll)
router.get('/:id', farmController.getOne)
router.post('/', auth.idIsValid, farmController.createFarm)
router.put('/:id', farmController.updateFarm)
router.patch('/:id', farmController.pushUserId)
router.delete('/:id', farmController.deleteFarm)

router.post('/collect/:id', farmController.collect)

module.exports = router