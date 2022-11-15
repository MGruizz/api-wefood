const {Router} = require ('express');
const router = Router();

const {getUsersById} = require('../controllers/user-controller/user-controller')
const {logearUsuario} = require('../controllers/user-controller/user-controller')
const {registrarUsuario} = require('../controllers/user-controller/user-controller')
const {getAllRecipes} = require('../controllers/recipe-controller/recipe-controller')
const {getRecipesByUserId} = require('../controllers/recipe-controller/recipe-controller')
const {getTagsByRecipeID} = require('../controllers/tag-controller/tag-controller')
const {getAllTags} = require('../controllers/tag-controller/tag-controller')

//Ruta usuario
router.get('/usuarios/:id/',getUsersById);
router.post('/login/', logearUsuario);
router.get('/creacion-usuario/', registrarUsuario)
//Ruta Receta
router.get('/recetas/',getAllRecipes);
router.get('/recetas/:id',getRecipesByUserId)
//Ruta Tag
router.get('/tags/',getAllTags);
router.get('/tags/:id',getTagsByRecipeID)

module.exports = router;