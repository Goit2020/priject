const userEndpoints = {
  '/user': {
    get: {
      tags: ['user'],
      summary: 'Get current user',
      description: '',

      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [
        {
          in: 'body',
          name: 'get user',
          description: '',

          schema: {
            $ref: '#/definitions/userRequest',
          },
        },
      ],
      responses: {
        401: {
          description: 'Unauthorized user, user token is invalid',
        },
        200: {
          description: 'Get user successfully',
          schema: {
            $ref: '#/definitions/GetUser',
          },
        },
      },
    },
  },
};

const userDefinitions = {
  userRequest: {
    xml: {
      name: 'GetUser',
    },
  },
  GetUser: {
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
      name: 'GetUser',
    },
  },
};

module.exports = { userEndpoints, userDefinitions };
