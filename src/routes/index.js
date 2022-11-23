const {Router} = require ('express');
const handleError = require('../middlewares/handleError');
const router = Router();
const userExtractor = require('../middlewares/userExtractor')

const {getUsersById,logearUsuario,registrarUsuario} = require('../controllers/user-controller/user-controller')
const {getAllRecipes,getRecipesByUserId,crearNuevaReceta,eliminarReceta,editarReceta} = require('../controllers/recipe-controller/recipe-controller')
const {getTagsByRecipeID,getAllTags,agregarTag,eliminarTag,editarTag} = require('../controllers/tag-controller/tag-controller')


//Ruta usuario
router.get('/usuarios/:id/',getUsersById);
router.post('/login/', logearUsuario);
router.post('/usuarios/', registrarUsuario)
//Ruta Receta
router.get('/recetas/',getAllRecipes);
router.get('/recetas/:id',getRecipesByUserId);
router.post('/recetas/',userExtractor ,crearNuevaReceta)
router.delete('/recetas/',userExtractor ,eliminarReceta)
router.put('/recetas/',userExtractor ,editarReceta)
//Ruta Tag
router.get('/tags/',getAllTags);
router.get('/tags/:id',getTagsByRecipeID);
router.post('/tags/',userExtractor,agregarTag);
router.delete('/tags/',userExtractor,eliminarTag);
router.put('/tags/',userExtractor,editarTag);

//Not found middleware
router.use((req,res,next)=>{
    res.status(404).send({error:'Not found'})
})

router.use(handleError);


module.exports = router;