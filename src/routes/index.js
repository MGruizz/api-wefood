const {Router} = require ('express');
const handleError = require('../middlewares/handleError');
const router = Router();
const userExtractor = require('../middlewares/userExtractor')

const {getUsersById} = require('../controllers/user-controller/user-controller')
const {logearUsuario} = require('../controllers/user-controller/user-controller')
const {registrarUsuario} = require('../controllers/user-controller/user-controller')
const {getAllRecipes} = require('../controllers/recipe-controller/recipe-controller')
const {getRecipesByUserId} = require('../controllers/recipe-controller/recipe-controller')
const {crearNuevaReceta} = require('../controllers/recipe-controller/recipe-controller')
const {getTagsByRecipeID} = require('../controllers/tag-controller/tag-controller')
const {getAllTags} = require('../controllers/tag-controller/tag-controller')


//Ruta usuario
router.get('/usuarios/:id/',getUsersById);
router.post('/login/', logearUsuario);
router.post('/usuarios/', registrarUsuario)
//Ruta Receta
router.get('/recetas/',getAllRecipes);
router.get('/recetas/:id',getRecipesByUserId);
router.post('/recetas/',userExtractor ,crearNuevaReceta)
//Ruta Tag
router.get('/tags/',getAllTags);
router.get('/tags/:id',getTagsByRecipeID)

//Not found middleware
router.use((req,res,next)=>{
    res.status(404).send({error:'Not found'})
})

router.use(handleError);


module.exports = router;