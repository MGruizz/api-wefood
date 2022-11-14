const pool = require('../../configs/db.config')

const getAllTags = async (req,res) => {
    const response = await pool.query(`SELECT * FROM tags`);
    res.status(200).json(response.rows);
    pool.end;
}

const getTagsByRecipeID = async (req,res) => {
    const idReceta = req.params.id;
    const response = await pool.query(`select tags.idtag,tags.nombre from tag_receta ta join tags ON tags.idtag = ta.idtag where ta.idreceta=${idReceta}`);
    res.status(200).json(response.rows);
    pool.end;
}

module.exports = {
    getAllTags,
    getTagsByRecipeID
}