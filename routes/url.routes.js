const express = require('express');
const router = express.Router();

const {
    createShortUrl,
    redirectUrl,
    getMyUrls
} = require('../controllers/url.controller');

const authMiddleware = require('../middleware/auth.middleware');

router.post('/create', authMiddleware, createShortUrl);
router.get('/my', authMiddleware, getMyUrls);

// Public route
router.get('/:code', redirectUrl);

module.exports = router;