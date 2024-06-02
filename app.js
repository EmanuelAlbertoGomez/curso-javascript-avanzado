const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Icon
app.use(favicon(path.join(__dirname, 'public', 'ecommerce.ico')));
// CSS
app.use('/css', express.static(path.join(__dirname, 'node_modules')));
app.use('/css', express.static(path.join(__dirname, 'css')));
// JS
app.use('/js', express.static(path.join(__dirname, 'node_modules')));
app.use('/js', express.static(path.join(__dirname, 'scripts')));
// MOCKS
app.use('/mocks', express.static(path.join(__dirname, 'mocks')));
// Handlebars
app.use('/handlebars', express.static(path.join(__dirname, 'handlebars')));

// Ruta para cargar la vista HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia el servidor en el puerto parametrizado y escribe un log
app.listen(port, () => {
    console.log(`Aplicación corriendo en: http://localhost:${port}`);
});