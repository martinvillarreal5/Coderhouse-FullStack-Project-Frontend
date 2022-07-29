
import 'dotenv/config'
import path from 'path';
const port = process.env.PORT || 8080;

import express, { json, urlencoded } from 'express';
const app = express();
import routes from './routes/index.js';

// post url encode
app.use(json());
app.use(urlencoded({ extended: true }));
//app.use('/', express.static(path.join(__dirname + '../public')));

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