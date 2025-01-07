// Importaciones necesarias
const express = require('express');
const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');
const port = 3050;
const { v4: uuidv4 } = require('uuid');
const routes = require('./network/routes.js');
import './associations.js'; // Ejecuta el archivo sin importar nada

// import conexion from './database.js'; // Asegúrate de que la ruta sea correcta.

// Configuración inicial de Express
const app = express();
const options = {
    key: fs.readFileSync('key.pem'), // Cambia a la ruta correcta
    cert: fs.readFileSync('cert.pem') // Cambia a la ruta correcta
};



// Configurar servidor HTTPS
const server = https.createServer(options, app);

// Middleware de Express para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de ejemplo
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Iniciar servidor HTTPS
server.listen(port, '0.0.0.0', () => {
    console.log(`Server running on https://0.0.0.0:${port}`);
});

app.use('/', routes);

// Exportar app para pruebas o expansión
module.exports = app;
