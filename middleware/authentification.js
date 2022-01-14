const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers['x-access-token'] || (req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null);

    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'Veuillez saisir un token.',
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.decoded = decoded;
    } catch(err) {

        return res.status(401).json({
            success: false,
            message: 'Le token est incorrect.',
        });

    }

    next();

}