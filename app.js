const express = require('express');
const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');
const cors = require('cors'); // Importa el paquete CORS
const port = 3050;
import { Association } from './associations.js';

// Configuración inicial de Express
const app = express();

// Configura las opciones de HTTPS con tus certificados
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// Configura tu servidor HTTPS con la aplicación de Express
const server = http.createServer(options, app);

// Configuración de WebSocket en el mismo servidor HTTPS
const wss = new WebSocket.Server({ server });

// Middleware de Express para parsear JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS para permitir solicitudes del puerto 5173
app.use(cors({
    origin: 'http://localhost:5173'  // Ajusta esto según tus necesidades
}));

// Define tus rutas
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Otros middlewares o rutas
const routes = require('./network/routes.js');
app.use('/', routes);

// Eventos de WebSocket
wss.on('connection', function connection(ws) {
    console.log('Cliente conectado');

    // Notificar al cliente que se ha conectado
    ws.send(JSON.stringify({ type: 'WELCOME', message: 'Bienvenido al servidor WebSocket' }));

    // Notificar a todos los demás clientes que un nuevo cliente se ha conectado
    wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ type: 'NEW_CONNECTION', message: 'Un nuevo usuario se ha conectado a Projects' }));
        }
    });

    // Manejar mensajes entrantes (si necesitas recibir mensajes del cliente)
    ws.on('message', function incoming(message) {
        console.log('Mensaje recibido:', message);
    });

    // Manejar la desconexión
    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

// Escucha en el servidor HTTPS
server.listen(port, () => {
    console.log(`Servidor corriendo en https://localhost:${port}`);
});

// Exportar app para pruebas o expansión
module.exports = app;
