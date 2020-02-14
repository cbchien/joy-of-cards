/* eslint-disable no-console, no-useless-escape */
const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const paths = require('./path');
const routes = require('./routes');
const cors = require('cors')

dotenv.config();

const app = express();
app.use(express.static(paths.dist));
app.use(cors())
app.use('/', routes);

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {console.log(`Server Running on port ${port}`)}) 