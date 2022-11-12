const {Router} = require ('express');
const router = Router();

const {getUsersById} = require('../controllers/user-controller/user-controller')

router.get('/usuario/:id',getUsersById);

module.exports = router;