const authEndpoints = {
  '/auth/sign-up': {
    post: {
      tags: ['auth'],
      summary: 'Signup and create new user in database',
      description: '',
      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [
        {
          in: 'body',
          name: 'signup',
          description: 'User object that needs to be created',
          required: true,
          schema: {
            $ref: '#/definitions/SignupRequest',
          },
        },
      ],
      responses: {
        400: {
          description: 'Request body format is invalid',
        },
        409: {
          description: 'User with such email already exists',
        },
        201: {
          description: 'User and session were successfully created',
          schema: {
            $ref: '#/definitions/Signup',
          },
        },
      },
    },
  },

  '/auth/sign-in': {
    post: {
      tags: ['auth'],
      summary: 'User authorization',
      description: '',
      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [
        {
          in: 'body',
          name: 'signin',
          description: 'User object that needs to be created',
          required: true,
          schema: {
            $ref: '#/definitions/SigninRequest',
          },
        },
      ],
      responses: {
        400: {
          description: 'Request body format is invalid',
        },
        403: {
          description: 'Incorrect password',
        },
        404: {
          description: 'User does not exist',
        },
        201: {
          description: 'User and session were successfully created',
          schema: {
            $ref: '#/definitions/Signin',
          },
        },
      },
    },
  },

  '/auth/sign-out': {
    delete: {
      tags: ['auth'],
      summary: 'Disable session',
      description: '',
      operationId: 'getSignOut',
      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [
        {
          in: 'header',
          name: 'Authorization',
          type: 'string',
          required: true,
        },
      ],
      responses: {
        401: {
          description: 'Unauthorized user, user token is invalid',
        },
        204: {
          description: 'When user session disabled',
        },
      },
    },
  },
};

const authDefinitions = {
  SignupRequest: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
    xml: {
      name: 'Signup',
    },
  },
  Signup: {
    type: 'object',
    properties: {
      user: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            format: 'int32',
          },
          username: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          balance: {
            type: 'number',
            format: 'int32',
          },
        },
      },
    },
    xml: {
      name: 'Signup',
    },
  },

  SigninRequest: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
    xml: {
      name: 'Signin',
    },
  },
  Signin: {
    type: 'object',
    properties: {
      user: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            format: 'int32',
          },
          username: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          balance: {
            type: 'number',
            format: 'int32',
          },
        },
      },
    },
    xml: {
      name: 'Signin',
    },
  },
};

module.exports = { authEndpoints, authDefinitions };
