const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const router = require('./routes/authRoutes');

const app = express();

// Swagger configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de ejemplo',
      version: '1.0.0',
      description: 'Una API de ejemplo para ilustrar swaggerDocs',
    },
  },
  apis: ['./routes/authRoutes.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(bodyParser.json());

// Routes
app.use(router);  // Ensure 'router' is a middleware function

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

module.exports = app;
