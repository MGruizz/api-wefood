const pool = require('../../configs/db.config')

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

const crearNuevaReceta = (req,res,next) => {
    const {
        nombrereceta,
        descripcionreceta,
        ingredientes,
        pasosrecetas,
        tags
    } = req.body
    let idReceta = 0;
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        const {idusuario} = req;
        try{
            pool
                .query(`INSERT INTO recetas (idautor, nombrereceta, descripcionreceta, ingredientes,pasosreceta)VALUES ($1, $2, $3, $4, $5) RETURNING idreceta`,[idusuario,nombrereceta,descripcionreceta,ingredientes,pasosrecetas])
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
                    res.status(201).send('Insersion exitosa');
                })
                .catch(err => {
                    next(err)
                })
        }catch(err){
            next(err);
        }
    }
    else{
        res.status(400).send(console.log('Sin autorizacion'));
    }

    
}

module.exports = {
    getAllRecipes,
    getRecipesByUserId,
    crearNuevaReceta
}