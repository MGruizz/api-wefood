const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authorization = req.get('authorization')
    let token = ''

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken);

    if (!token || !decodedToken.id) {
        return res.status(401).json({error:'Token perdido o invalido'});
    }

    const { id: userId } = decodedToken;

    req.userId = userId;

    next();
}