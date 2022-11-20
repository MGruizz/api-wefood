const pool = require('../../configs/db.config')
const jwt = require('jsonwebtoken');

const getAllRecipes = async (req,res) => {
    const response = await pool.query(`SELECT * FROM recetas`);
    res.status(200).json(response.rows);
    pool.end;
}

const getRecipesByUserId =(req,res,next) => {
    const idUser = req.params.id;

    pool
        .query(`select re.idreceta,re.descripcionreceta,re.idautor,re.imagenes,re.ingredientes,re.nombrereceta,re.pasosreceta from usuarios us JOIN recetas re on re.idautor = us.idusuario  where us.idusuario= ${idUser}`)
        .then(results => res.status(200).json(results.rows))
        .catch(err => next(err))   
}

const crearNuevaReceta = async (req,res) => {
    
}

module.exports = {
    getAllRecipes,
    getRecipesByUserId,
    crearNuevaReceta
}