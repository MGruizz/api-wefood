const pool = require('../../configs/db.config')

const bcryptjs = require("bcryptjs");


const getUsersById = async (req,res) => {
    const id = req.params.id;
    const response = await pool.query(`SELECT * FROM usuarios where idusuario = ${id}`);
    res.status(200).json(response.rows[0]);
    pool.end;
}

const logearUsuario = async (req, res) => {
    const {correoElectronico, password} = req.body;
    console.log(correoElectronico, password);
    const user = await pool.query(
        'SELECT * FROM usuarios where correoelectronico = $1', [correoElectronico],
        (err, results) => {
            if (err) {
                res.status(401).send(console.log(err.stack));
            } else {
                console.log(results.rows[0])
            }

            if(results.rows.length > 0) {
                const user = results.rows[0];

                bcryptjs.compare(password, user.password, (err, isMatch) => {
                    if(err) {
                        res.status(401).send(console.log(err.stack));
                    }

                    if(isMatch) {
                        res.status(200).json(user);
                    }

                });
            }
        }
    );
}

const registrarUsuario = async (req, res) => {
    const {nombrepersona, correoelectronico, password} = req.body;
    let hashPassword = await bcryptjs.hash(password, 10);
    pool.query(
        'SELECT * FROM usuarios where correoelectronico = $1', [correoelectronico],
        (err, results) => {
            if(err) {
                res.status(401).send(console.log(err.stack));
            }
            console.log(results.rows[0]);

            if(results.rows.length > 0) {
                res.status(401).send(console.log(err.stack));
            } else {
                console.log(nombrepersona, correoelectronico, password, hashPassword, 'holas');
                pool.query(
                    `INSERT INTO usuarios (nombrepersona, correoelectronico, password)
                    VALUES ($1, $2, $3)`, [nombrepersona, correoelectronico, hashPassword],
                    (err, results) => {
                        if(err) {
                            res.status(401).send(console.log(err.stack));
                        } else {
                            res.status(200).send(results);
                        }
                    }
                )
            }
        }
    );
}

module.exports = {
    getUsersById,
    logearUsuario,
    registrarUsuario
}
