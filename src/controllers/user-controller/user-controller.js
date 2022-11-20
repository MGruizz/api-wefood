const pool = require('../../configs/db.config')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const bcryptjs = require("bcryptjs");


const getUsersById = (req,res,next) => {
    const id = req.params.id;
    try{
        pool
            .query(`SELECT * FROM usuarios where idusuario = ${id}`)
            .then(response=> {
                if(response.rows == 0){
                    res.status(401).json({Error:'Id no existe'});
                }
                else{
                    res.status(200).json(response.rows[0]);
                }
            })
            .catch(err=> res.status(401).json({Error: err.message}))
    }catch(e){
        next(e)
    }
}

const logearUsuario =(req, res) => {
    const {correoElectronico, password} = req.body;
    console.log(correoElectronico, password);
    try{
        pool
            .query('SELECT * FROM usuarios where correoelectronico = $1', [correoElectronico])
            .then(results => {
                if(results.rows.length > 0) {
                    const user = results.rows[0];
                    bcryptjs.compare(password, user.password, (err, isMatch) => {
                        if(err) {
                            res.status(401).send(console.log(err.stack));
                        }
                        if(isMatch) {
                            const token = jwt.sign(user,process.env.SECRET)
                            res.status(200).send(token);
                        }
                        else{
                            res.status(401).json({Error:'Password invalida'});
                        }
    
                    });
                }
                else{
                    res.status(404).send('El correo no se encuentra registrado');
                }
            })
            .catch(err => res.status(401).json({Error: err.message}))
    }
    catch(err){
        next(e);
    }
}

const registrarUsuario = (req, res) => {
    const {nombrepersona, correoelectronico, password} = req.body;
    let hashPassword = bcryptjs.hash(password, 10);
    try{
        pool
            .query('SELECT * FROM usuarios where correoelectronico = $1', [correoelectronico])
            .then(results =>{
                if(results.rows.length > 0) {
                    res.status(401).json({Error: 'El mail ingresado ya se encuentra en uso'});
                }else {
                    console.log(nombrepersona, correoelectronico, password, hashPassword, 'holas');
                    pool
                        .query(`INSERT INTO usuarios (nombrepersona, correoelectronico, password)
                        VALUES ($1, $2, $3)`, [nombrepersona, correoelectronico, hashPassword],)
                        .then(results => res.status(200).send(results))
                        .catch(err => res.status(401).json({Error: err.message}))
                }
            })
            .catch(err => res.status(401).json({Error: err.message}))
    }
    catch(e){
        next(e)
    }
    
}


module.exports = {
    getUsersById,
    logearUsuario,
    registrarUsuario
}
