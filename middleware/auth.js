const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {

    // Get token from header
    const token = req.header('Authorization');
    // Check for missing token
    if (!token) {
        return res.status(401).json({ msg: 'Missing Token'});
    }

    try {
        const decoded = jwt.verify(token, config.get('jwt_secret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Invalid Token' });
    }
}