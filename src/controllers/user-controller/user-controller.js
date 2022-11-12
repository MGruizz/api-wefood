const pool = require('../../configs/db.config')

const getUsersById = async (req,res) => {
    const id = req.params.id;
    const response = await pool.query(`SELECT * FROM usuario where idusuario = ${id}`);
    res.status(200).json(response.rows[0]);
}

module.exports = {
    getUsersById
}
