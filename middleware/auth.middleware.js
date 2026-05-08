const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const header = req.header('Authorization');

    if (!header) {
        return res.status(401).json({ message: "No token" });
    }

    // EXPECTED: Bearer TOKEN
    const token = header.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;