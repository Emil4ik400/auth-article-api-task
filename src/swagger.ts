import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth & Article API',
      version: '1.0.0',
      description: 'A secure API for managing articles with user authentication',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    paths: {
      '/api/user': {
        post: {
          tags: ['Users'],
          summary: 'Register a new user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['user_id', 'login', 'password'],
                  properties: {
                    user_id: { type: 'string' },
                    login: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'User created' },
            400: { description: 'Missing fields' },
          },
        },
      },
      '/api/authenticate': {
        post: {
          tags: ['Auth'],
          summary: 'Login',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['login', 'password'],
                  properties: {
                    login: { type: 'string' },
                    password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Success' },
            401: { description: 'Unauthorized' },
          },
        },
      },
      '/api/articles': {
        get: {
          tags: ['Articles'],
          summary: 'Get articles',
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: 'OK' },
          },
        },
        post: {
          tags: ['Articles'],
          summary: 'Create article',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['title', 'content', 'visibility'],
                  properties: {
                    title: { type: 'string' },
                    content: { type: 'string' },
                    visibility: { type: 'string', enum: ['public', 'private', 'logged_in'] },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'Created' },
          },
        },
      },
    },
  },
  apis: [], 
};

export const swaggerSpec = swaggerJsdoc(options);