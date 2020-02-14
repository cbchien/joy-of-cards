
const path = require('path');

const paths = {};

// top-level directories
paths.dist       = path.resolve(__dirname, 'dist');
paths.publicPath = '/';
paths.src        = path.resolve(__dirname, 'src');

// nested directories / files can be added here
paths.indexHtml  = path.join(paths.src, 'index.html');
paths.clientMain = path.join(paths.src, 'index.js');
paths.serverApp  = path.join(paths.publicPath, 'server.js');

module.exports = paths;