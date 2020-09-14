const request = require('supertest');
const db = require('../src/db');
const startServer = require('../src/server');
const { deleteSession, createSession } = require('../src/instances/session');
const { deleteUser, createUser } = require('../src/instances/user');
const { setPasswordHash } = require('../src/helpers/encryption');
const { generateToken } = require('../src/helpers/token');
const { deleteTransaction } = require('../src/instances/transactions');
const sequelize = require('../src/helpers/sequelize');

require('dotenv').config();

describe('Transactions tests', () => {
  let app;
  let createdUser;
  let createdSession;
  let token;
  let userID;
  let transactionId;
  const port = process.env.PORT || 3000;

  beforeAll(async () => {
    await db();
    app = await startServer(port);

    createdUser = await createUser({
      username: 'testname',
      email: 'test@mail.com',
      passwordHash: await setPasswordHash('test'),
    });

    userID = createdUser.id;

    createdSession = await createSession(createdUser.id);

    let tokenData = generateToken(createdSession.id);

    token = `token=${tokenData}`;
  });

  afterAll(async () => {
    await deleteTransaction(transactionId);

    await deleteUser(userID);
    await deleteSession(userID);
    await app.close();
    await sequelize.close();
  });

  describe('Create transaction', () => {
    it('should create transaction', async () => {
      const response = await request(app)
        .post('/transactions')
        .set('Cookie', token)
        .set('Content-Type', 'application/json')
        .send({
          date: '12.01.2020',
          type: 'Income',
          categoryId: '2',
          comment: 'Comment',
          amount: 236,
        })
        .expect(201);

      const responseBody = response.body;
      transactionId = responseBody.transaction.id;

      expect(responseBody).toHaveProperty('transaction');
      expect(responseBody.transaction).toHaveProperty('id');
      expect(responseBody.transaction).toHaveProperty('date');
      expect(responseBody.transaction).toHaveProperty('type');
      expect(responseBody.transaction).toHaveProperty('categoryId');
      expect(responseBody.transaction).toHaveProperty('userId');
      expect(responseBody.transaction).toHaveProperty('comment');
      expect(responseBody.transaction).toHaveProperty('amount');
      expect(responseBody.transaction).toHaveProperty('balanceAfter');
    });

    it('should get err 401: Unauthorized', async () => {
      const response = await request(app)
        .post('/transactions')
        .set('Content-Type', 'application/json')
        .send({
          date: '2020',
          type: 'Error',
          categoryId: '2',
          comment: 'Comment',
          amount: 300,
        })
        .expect(401);
    });

    it('should get err 400: invalid data', async () => {
      const response = await request(app)
        .post('/transactions')
        .set('Cookie', token)
        .set('Content-Type', 'application/json')
        .send({
          date: '2020',
          type: 'Error',
          categoryId: '2',
          comment: 'Comment',
          amount: 300,
        })
        .expect(400);
    });
  });

  describe('Get transactions', () => {
    it('should get all transactions', async () => {
      const response = await request(app)
        .get('/transactions')
        .set('Cookie', token)
        .expect(200);

      const responseBody = response.body;

      expect(responseBody).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.anything(),
            date: expect.any(String),
            type: expect.any(String),
            categoryId: expect.anything(),
            userId: expect.any(String),
            comment: expect.any(String),
            amount: expect.any(Number),
            balanceAfter: expect.any(Number),
          }),
        ]),
      );
    });

    it('should get transactions summary', async () => {
      const response = await request(app)
        .get('/transactions/summary?year=2020&month=12')
        .set('Cookie', token)
        .expect(200);

      const responseBody = response.body;

      expect(responseBody).toEqual(
        expect.objectContaining({
          stats: expect.arrayContaining([
            expect.objectContaining({
              type: expect.any(String),
              categoryId: expect.anything(),
              totalAmount: expect.any(Number),
            }),
          ]),
          month: expect.any(String),
          year: expect.any(String),
        }),
      );
    });

    it('should get transactions summaru Error validation', async () => {
      const response = await request(app)
        .get('/transactions/summary?year=&month=12')
        .set('Cookie', token)
        .expect(400);
    });
  });
});
