const pool = require('../../configs/db.config')

const getAllRecipes = async (req,res) => {
    const response = await pool.query("SELECT * FROM recetas");
    res.status(200).json(response.rows);
    pool.end;
}

module.exports = {
    getAllRecipes
}