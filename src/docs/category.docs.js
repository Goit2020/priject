const categoryEndpoints = {
  '/transaction-categories': {
    get: {
      tags: ['categories'],
      summary: 'Get all categories',
      description: '',

      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [
        {
          in: 'body',
          name: 'get category',
          description: '',

          schema: {
            $ref: '#/definitions/categoryRequest',
          },
        },
      ],
      responses: {
        401: {
          description: 'Unauthorized user, user token is invalid',
        },
        200: {
          description: 'Get category successfully',
          schema: {
            $ref: '#/definitions/GetCategory',
          },
        },
      },
    },
  },
};

const categoryDefinitions = {
  categoryRequest: {
    xml: {
      name: 'GetCategory',
    },
  },
  GetCategory: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
      },
    },
    xml: {
      name: 'GetCategory',
    },
  },
};

module.exports = { categoryEndpoints, categoryDefinitions };
