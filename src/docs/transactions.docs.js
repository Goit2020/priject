const transactionEndpoints = {
  '/transactions': {
    post: {
      tags: ['transactions'],
      summary: 'Create transaction',
      description: '',

      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [
        {
          in: 'body',
          name: 'create transaction',
          description: '',

          schema: {
            $ref: '#/definitions/transactionRequest',
          },
        },
      ],
      responses: {
        400: {
          description: 'Request body format is invalid',
        },
        401: {
          description: 'Unauthorized user, user token is invalid',
        },
        201: {
          description: 'Transaction successfully created',
          schema: {
            $ref: '#/definitions/PostTransaction',
          },
        },
      },
    },
  },

  '/transactions ': {
    get: {
      tags: ['transactions'],
      summary: 'Get transaction',
      description: '',

      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [
        {
          in: 'body',
          name: 'get transactions',
          description: '',

          schema: {
            $ref: '#/definitions/transactionGetRequest',
          },
        },
      ],
      responses: {
        400: {
          description: 'Request body format is invalid',
        },
        401: {
          description: 'Unauthorized user, user token is invalid',
        },
        200: {
          description: 'Transactions get successfully',
          schema: {
            $ref: '#/definitions/GetTransaction',
          },
        },
      },
    },
  },

  '/transactions/summary?year=&month=': {
    get: {
      tags: ['transactions'],
      summary: 'Get transactions summary',
      description: '',

      consumes: ['application/json'],
      produces: ['application/json'],
      parameters: [
        {
          in: 'query',
          name: 'year',
          description: 'Filter by year - optional/required when month exist',
          schema: {
            type: 'string',
          },
        },
        {
          in: 'query',
          name: 'month',
          description: 'Filter by month - optional',
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        400: {
          description: 'Query parametrs is invalid',
        },
        401: {
          description: 'Unauthorized user, user token is invalid',
        },
        200: {
          description: 'Transactions summary get successfully',
          schema: {
            $ref: '#/definitions/GetTransactionsSummary',
          },
        },
      },
    },
  },
};

const transactionDefinitions = {
  transactionRequest: {
    type: 'object',
    properties: {
      date: {
        type: 'string',
      },
      type: {
        type: 'string',
      },
      categoryId: {
        type: 'string',
      },
      comment: {
        type: 'string',
        required: false,
      },
      amount: {
        type: 'number',
      },
    },
    xml: {
      name: 'PostTransaction',
    },
  },
  PostTransaction: {
    type: 'object',
    properties: {
      transaction: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
          },
          date: {
            type: 'string',
          },
          type: {
            type: 'string',
          },
          categoryId: {
            type: 'string',
          },
          comment: {
            type: 'string',
            required: false,
          },
          amount: {
            type: 'number',
          },
          balanceAfter: {
            type: 'number',
          },
        },
      },
    },
    xml: {
      name: 'PostTransaction',
    },
  },

  transactionGetRequest: {
    xml: {
      name: 'GetTransaction',
    },
  },
  GetTransaction: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        date: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
        categoryId: {
          type: 'string',
        },
        comment: {
          type: 'string',
          required: false,
        },
        amount: {
          type: 'number',
        },
        balanceAfter: {
          type: 'number',
        },
      },
    },
    xml: {
      name: 'GetTransaction',
    },
  },

  GetTransactionsSummary: {
    type: 'object',
    properties: {
      stats: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            categoryId: {
              type: 'string',
            },
            type: {
              type: 'string',
            },
            totalAmount: {
              type: 'number',
            },
          },
        },
      },
      month: { type: 'string' },
      year: { type: 'string' },
    },
    xml: {
      name: 'PostTransaction',
    },
  },
};

module.exports = { transactionEndpoints, transactionDefinitions };
