const jwt = require('jsonwebtoken');
const secret = process.send.JWT_SECRET || 'secret stringy thingy';



module.exports = (req, res, next) => {
    const token = req.headers.authorization ?
    req.headers.authorization.split(' ')[1] : 
    '';

    console.log('token', token)

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: 'missing or bad credentials provided'});
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({message: 'missing or bad credentials provided'});
    }
};