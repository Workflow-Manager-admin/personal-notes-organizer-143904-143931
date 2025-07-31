const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal Notes API',
      version: '1.0.0',
      description: 'RESTful API for user authentication and notes management',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      { bearerAuth: [] }
    ],
    tags: [
      { name: 'Health', description: 'Service health check' },
      { name: 'Auth', description: 'User authentication' },
      { name: 'Notes', description: 'CRUD for personal notes' }
    ]
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
