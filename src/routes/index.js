const {Router} = require ('express');
const router = Router();

const {getUsersById} = require('../controllers/user-controller/user-controller')
const {getAllRecipes} = require('../controllers/recipe-controller/recipe-controller')

router.get('/usuarios/:id/',getUsersById);
router.get('/recetas/',getAllRecipes);

module.exports = router;