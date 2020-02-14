
const path = require('path');
const paths = require('./path');
const router = require('express').Router();

router
    .get('/*', (req, res, next) => {
        const routePath = path.join(paths.dist + '/index.html');
        res.sendFile(routePath);
    }
)

module.exports = router; 