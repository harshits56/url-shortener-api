const URL = require('../models/url.model');
const generateCode = require('../utils/generateCode');

exports.createShortUrl = async (req, res) => {
    const { originalUrl } = req.body;

    try {
        const shortCode = generateCode();

        const url = await URL.create({
            originalUrl,
            shortCode,
            user: req.user.id
        });

        res.json(url);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.redirectUrl = async (req, res) => {
    const { code } = req.params;

    try {
        const url = await URL.findOne({ shortCode: code });

        if (!url) {
            return res.status(404).json({ message: "Not found" });
        }

        url.clicks++;
        await url.save();

        res.redirect(url.originalUrl);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMyUrls = async (req, res) => {
    try {
        const urls = await URL.find({ user: req.user.id });
        res.json(urls);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};