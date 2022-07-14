
require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 8080;

const express = require('express');
const app = express();
const routes = require('./routes/index.js');

// post url encode
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(path.join(__dirname + '../public')));

// Routes
app.use('/', routes);

/* not found */
app.use((req, res) => {
    res.status(404).json({error: -2, descripcion: `Ruta '${req.path}' Método '${req.method}' - No Implementada`});
})

// error handler
app.use(function (err, req, res, next) {
    res.status(500).json({
        error: err.message,
    });
});

// start server
app.listen(port, (err) => {
    if (!err) {
        console.log(`El servidor se inicio en el puerto ${port}`);
    } else {
        console.log(`Hubo un error al iniciar el servidor: `, err);
    }
});