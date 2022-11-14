const pool = require('../../configs/db.config')

const getAllRecipes = async (req,res) => {
    const response = await pool.query(`SELECT * FROM recetas`);
    res.status(200).json(response.rows);
    pool.end;
}

const getRecipesByUserId = async (req,res) => {
    const idUser= req.params.id;
    const response = await pool.query(`select re.idreceta,re.descripcionreceta,re.idautor,re.imagenes,re.ingredientes,re.nombrereceta,re.pasosreceta from usuarios us JOIN recetas re on re.idautor = us.idusuario  where us.idusuario= ${idUser}`);
    res.status(200).json(response.rows);
    pool.end;
}

module.exports = {
    getAllRecipes,
    getRecipesByUserId
}