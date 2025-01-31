const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const authenticateLoginToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decodedToken = jwt.decode(token);

        if (!decodedToken || !decodedToken.email) {
            return res.status(403).json({ message: 'Invalid token structure' });
        }

        const emailFromToken = decodedToken.email;
        const emailFromRequest = req.body.email;

        if (emailFromToken !== emailFromRequest) {
            return res.status(403).json({ message: 'Token does not belong to the user' });
        }

        jwt.verify(token, ACCESS_TOKEN_SECRET, (err) => {
            if (err) {
                console.log('Token verification error:', err);
                return res.status(403).json({ message: 'Token is not valid' });
            }
        });

        req.user = decodedToken;

        next();
    } catch (err) {
        console.log('Error decoding token:', err);
        return res.status(403).json({ message: 'Token decoding failed' });
    }
};

module.exports = {
    authenticateLoginToken
};
