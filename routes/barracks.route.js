const express = require('express');
const router = express.Router();
const barrackController = require('../controllers/barrack.constroller');
const auth = require('../middlewares/authJwt')
const errHanddler = require('../middlewares/errorHanddler');

router.use(auth.authentication)
router.use(auth.authorization)
router.get('/', barrackController.getAll);
router.get('/:id', barrackController.getOne);
router.post('/', barrackController.createBarrack);
router.put('/:id', barrackController.updateBarrack);
router.delete('/:id', barrackController.deleteBarrack);
router.use(errHanddler)

router.post('/collect/:id', barrackController.collect)

module.exports = router;
