const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();

// Opciones de configuración de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de ejemplo',
      version: '1.0.0',
      description: 'Una API de ejemplo para ilustrar swaggerDocs',
    },
  },
  apis: ['./routes/authRoutes.js'], // Ubicación de tus archivos de rutas
};

// Genera la especificación de Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(bodyParser.json());

module.exports = { app, swaggerDocs };
