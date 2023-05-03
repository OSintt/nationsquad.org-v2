const express = require('express');
const router = express.Router();

const isBanned = (req, res, next) => {
    if (!req.user) return next();
    if (req.user.ban) return res.status(403).json({status: 403, message: 'raja de acá lammer'});
    return next();
}

router.use('/auth', [isBanned], require('./auth'));
router.use('/dox', [isBanned], require('./dox'));
router.use('/discord_auth', require('./discord_auth'));
router.use('/*', (req, res) => {
    res.status(404).json({status: 404, message: "Not found"})
});

module.exports = router; 