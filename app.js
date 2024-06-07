require('dotenv').config();

const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Si está desplegado en el servidor setea backend de railway también, sino localhost
const backendUrl = process.env.RAILWAY_ENVIRONMENT_NAME == 'production' ? process.env.API_BACKEND_URL : 'http://localhost:4000';

// Muestra por consola URL de backend
console.log(`URL de backend: ${backendUrl}`);

// Icon
app.use(favicon(path.join(__dirname, 'public', 'ecommerce.ico')));
// CSS
app.use('/css', express.static(path.join(__dirname, 'node_modules')));
app.use('/css', express.static(path.join(__dirname, 'css')));
// JS
app.use('/js', express.static(path.join(__dirname, 'node_modules')));
app.use('/js', express.static(path.join(__dirname, 'scripts')));
// Handlebars
app.use('/sourceTemplates', express.static(path.join(__dirname, 'sourceTemplates')));

// Ruta para cargar la vista HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia el servidor en el puerto parametrizado y escribe un log
app.listen(port, () => {
    console.log(`Aplicación corriendo en puerto: ${port}`);
});

// Ruta para realizar el fetch desde el archivo eCommerce.js
app.get('/productos', async (req, res) => {
  try {
    const productos = `${backendUrl}/api/productos`;
    console.log(`Se invoca a la ruta: ${productos}`);
    
    const response = await fetch(productos);
    const data = await response.json();

    // Devuelve los datos obtenidos como respuesta
    res.json(data);
  } catch (error) {
    console.error('Error al obtener los datos:', error.message);
    res.status(500).send('Error en el servidor');
  }
});