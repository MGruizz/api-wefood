const {Router} = require ('express');
const router = Router();

const {getUsersById} = require('../controllers/user-controller/user-controller')

router.get('/usuarios/:id/',getUsersById);

module.exports = router;