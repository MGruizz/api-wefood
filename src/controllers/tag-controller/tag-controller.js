const pool = require('../../configs/db.config')

const getAllTags = async (req,res) => {
    const response = await pool.query(`SELECT * FROM tags`);
    res.status(200).json(response.rows);
    pool.end;
}

const getTagsByRecipeID = (req,res) => {
    const idReceta = req.params.id;
    try{
        pool
        .query(`select tags.idtag,tags.nombre from tag_receta ta join tags ON tags.idtag = ta.idtag where ta.idreceta=$1`,[idReceta])
        .then(response => {
            if(response.rows > 0){
                res.status(200).json({res:response.rows})
            }
            else{
                res.status(200).json([]);
            }
        })
        .catch(err => res.status(401).json({Error: err.message}))
    }catch(e){
        next(e);
    }
}

module.exports = {
    getAllTags,
    getTagsByRecipeID
}