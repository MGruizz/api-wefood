const pool = require('../../configs/db.config')

const getAllRecipes = async (req,res,next) => {
    let autores = [];
    try{
        await pool
        .query(`SELECT recetas.idautor,recetas.idreceta,recetas.nombrereceta,recetas.descripcionreceta,recetas.ingredientes,recetas.pasosreceta,recetas.imagenes,usuarios.nombrepersona
             FROM recetas join usuarios on idautor = idusuario`)
        .then(response => {
            res.status(200).json(response.rows)
        })
        .catch(err => console.log(err.message))
    }
    catch(e){
        next(e);
    }
    
}

const getRecipesByUserId =(req,res,next) => {
    const idUser = req.params.id;

    pool
        .query(`select re.idreceta,re.descripcionreceta,re.idautor,re.imagenes,re.ingredientes,re.nombrereceta,re.pasosreceta from usuarios us JOIN recetas re on re.idautor = us.idusuario  where us.idusuario= ${idUser}`)
        .then(results => res.status(200).json(results.rows))
        .catch(err => next(err))   
}

const crearNuevaReceta = async (req,res,next) => {
    const {
        nombrereceta,
        descripcionreceta,
        ingredientes,
        pasosrecetas,
        tags
    } = req.body
    let imagen = 'https://media.discordapp.net/attachments/1013532354725281872/1020105421404508190/WeFood_Mascot_Sad.png?width=985&height=554'
    let idReceta = 0;
    const {idusuario} = req;
    try{
        await pool
            .query(`INSERT INTO recetas (idautor, nombrereceta, descripcionreceta, ingredientes,pasosreceta,imagenes)VALUES ($1, $2, $3, $4, $5,$6) RETURNING idreceta`,[idusuario,nombrereceta,descripcionreceta,ingredientes,pasosrecetas,imagen])
            .then(results => {
                idReceta = results.rows[0].idreceta;
                for(let i in tags){    
                    pool
                        .query(`INSERT INTO tag_receta (idreceta,idtag)VALUES ($1, $2)`,[idReceta,tags[i]])
                        .then(results => {
                            console.log(`tag ${i}: ${tags[i]} insertado a la receta`);
                        })
                        .catch(err => {
                            console.log(err.message)
                        })
                }
                res.status(201).json({res:'Insersion exitosa'});
            })
            .catch(err => {
                next(err)
            })
    }catch(err){
        next(err);
    }
    
}

const eliminarReceta = (req,res) => {
    const {idreceta} = req.body;
    try{
        pool
            .query('DELETE FROM recetas WHERE idreceta = $1 RETURNING nombrereceta',[idreceta])
            .then(response => {
                console.log(response.rows)
                if(response.rows > 0){
                    res.status(200).json({res: 'Receta eliminada exitosamente'});
                }
                else{
                    res.status(401).json({res:'No se encuentra la receta'})
                }
            })
            .catch(err => res.status(401).json({Error:err.message}))
    }catch(e){
        next(e);
    }
}

const editarReceta = (req,res) => {
    const {ididreceta,nombrereceta,descripcionreceta,ingredientes,pasosrecetas,imagenes} = req.params.body;
    try{
        pool
            .query('SELECT * FROM recetas WHERE idreceta = $1',[idreceta])
            .then(response => {
                if(response.rows > 0){
                    pool
                        .query(`UPDATE recetas SET nombrereceta = $1,descripcionreceta = $2,ingredientes = $3,pasosrecetas = $4,imagenes = $5,
                                 where idtag = $6`,[nombrereceta,descripcionreceta,ingredientes,pasosrecetas,imagenes,ididreceta])
                        .then(response => {
                            res.status(401).json({Res:'Tag actualizado exitosamente',Receta:response.rows[0]})
                        })
                        .catch(err => res.status(401).json({Error:err.message}))
                    
                }
                else{
                    res.status(401).json({Error: 'La receta buscada no existe'});
                }
            })
            .catch(err => res.status(401).json({Error:err.message}))
    }catch(e){
        next(e);
    }
}

module.exports = {
    getAllRecipes,
    getRecipesByUserId,
    crearNuevaReceta,
    eliminarReceta,
    editarReceta
}