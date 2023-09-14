//Files
const config = require('./config/config.js');

//Modules
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const fs = require('fs');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Database connection
const db = require('./config/db.js');
db.connect();



//Routes
const customerRoutes = require('./routes/customer.routes.js');
app.use('/api/v1', customerRoutes);



//Server
let server;
if (config.server.protocol === 'https') {
    var https = require('https');
    var options = {
        key: fs.readFileSync(config.sslCertificates.privKey),
        cert: fs.readFileSync(config.sslCertificates.fullchain)
    };
    server = https.createServer(options, app);
} else {
    var http = require('http');
    server = http.createServer(app);
};

server.listen(config.server.port, () => {
    console.log(`Server listing on port ${config.server.port}`);
});




