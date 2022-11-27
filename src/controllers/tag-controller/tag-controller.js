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
            if(response.rows.length > 0){
                res.status(200).json({res:response.rows})
            }
            else{
                res.status(200).json({res:[]});
            }
        })
        .catch(err => res.status(401).json({Error: err.message}))
    }catch(e){
        next(e);
    }
}

const agregarTag = (req,res) => {
    const tag = (req.params.nombre).charAt(0).toUpperCase() + ((req.params.nombre).slice(1));
    try{
        pool
            .query('SELECT nombre FROM tags WHERE nombre = $1',[tag])
            .then(response => {
                if(response.rows > 0){
                res.status(401).json({Error: 'El tag ingresado ya se encuentra ingresado'});
                }
                else{
                    pool
                        .query('INSERT INTO tags (nombre) VALUES ($1)',[tag])
                        .then(response => {
                            res.status(401).json({Res:'Tag ingresado exitosamente'})
                        })
                        .catch(err => res.status(401).json({Error:err.message}))
                }
            })
            .catch(err => res.status(401).json({Error:err.message}))
    }catch(e){
        next(e);
    }
}

// Problema al eliminar con clave foranea en tabla NUB
const eliminarTag = (req,res) => {
    const {id} = req.body;
    try{
        pool
            .query('DELETE FROM tags WHERE idtag = $1 RETURNING nombre',[id])
            .then(response => {
                console.log(response.rows)
                if(response.rows > 0){
                    res.status(200).json({res: 'Tag eliminado exitosamente'});
                }
                else{
                    res.status(401).json({res:'No se encuentra el tag'})
                }
            })
            .catch(err => res.status(401).json({Error:err.message}))
    }catch(e){
        next(e);
    }
}

// Mismo problema que eliminar
const editarTag = (req,res) => {
    const {id,nombre} = req.params.body;
    try{
        pool
            .query('SELECT * FROM tags WHERE idtag = $1',[id])
            .then(response => {
                if(response.rows > 0){
                    pool
                        .query('UPDATE TAGS set nombre = $1 where idtag = $2',[nombre,id])
                        .then(response => {
                            res.status(401).json({Res:'Tag actualizado exitosamente',Tag:response.rows[0]})
                        })
                        .catch(err => res.status(401).json({Error:err.message}))
                    
                }
                else{
                    res.status(401).json({Error: 'El tag buscado no existe'});
                }
            })
            .catch(err => res.status(401).json({Error:err.message}))
    }catch(e){
        next(e);
    }
}

module.exports = {
    getAllTags,
    getTagsByRecipeID,
    agregarTag,
    eliminarTag,
    editarTag
}