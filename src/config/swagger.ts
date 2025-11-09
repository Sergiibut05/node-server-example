import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { env } from './env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Express + PostgreSQL',
      version: '1.0.0',
      description: 'API REST con autenticación JWT, validación Zod, rate limiting y testing completo',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID del usuario',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
            },
            name: {
              type: 'string',
              description: 'Nombre del usuario',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
          },
        },
        RegisterInput: {
          type: 'object',
          required: ['email', 'name', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
            },
            name: {
              type: 'string',
              minLength: 2,
              description: 'Nombre del usuario',
            },
            password: {
              type: 'string',
              minLength: 8,
              description: 'Contraseña del usuario',
            },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            password: {
              type: 'string',
              minLength: 8,
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User',
            },
            token: {
              type: 'string',
              description: 'JWT token',
            },
          },
        },
        UpdateProfileInput: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            name: {
              type: 'string',
              minLength: 2,
            },
          },
        },
        ChangePasswordInput: {
          type: 'object',
          required: ['currentPassword', 'newPassword'],
          properties: {
            currentPassword: {
              type: 'string',
            },
            newPassword: {
              type: 'string',
              minLength: 8,
            },
          },
        },
        Post: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            title: { type: 'string' },
            content: { type: 'string', nullable: true },
            published: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            authorId: { type: 'integer' },
            author: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                email: { type: 'string', format: 'email' },
                name: { type: 'string' },
              },
            },
          },
        },
        CreatePostInput: {
          type: 'object',
          required: ['title'],
          properties: {
            title: { type: 'string' },
            content: { type: 'string' },
            published: { type: 'boolean' },
          },
        },
        UpdatePostInput: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            content: { type: 'string' },
            published: { type: 'boolean' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Auth',
        description: 'Endpoints de autenticación',
      },
      {
        name: 'Users',
        description: 'Gestión de usuarios',
      },
      { 
        name: 'Posts', 
        description: 'Gestión de publicaciones' 
      }
    ],
  },
  apis: [
    join(__dirname, '../modules/**/*.routes.js'),
    join(__dirname, '../modules/**/*.routes.ts'),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);

