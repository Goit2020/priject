const request = require('supertest');
const db = require('../src/db');
const startServer = require('../src/server');
const { deleteSession, createSession } = require('../src/instances/session');
const { deleteUser, createUser } = require('../src/instances/user');
const { setPasswordHash } = require('../src/helpers/encryption');
const { generateToken } = require('../src/helpers/token');
const sequelize = require('../src/helpers/sequelize');

require('dotenv').config();

describe('GET categories', () => {
  let app;
  let createdUser;
  let createdSession;
  let token;
  let userID;
  const port = process.env.PORT;

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
    await deleteUser(userID);
    await deleteSession(userID);
    await app.close();
    await sequelize.close();
  });

  describe('When get category success', () => {
    it('should get categories', async () => {
      const response = await request(app)
        .get('/transaction-categories')
        .set('Cookie', token)
        .expect(200);

      const responseBody = response.body;
      expect(responseBody).toBeDefined();
      expect(responseBody).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.anything(),
            name: expect.any(String),
            type: expect.any(String),
          }),
        ]),
      );
    });
  });

  describe('When Unauthorized', () => {
    it('should get err 401: Unauthorized', async () => {
      await request(app).get('/transaction-categories').expect(401);
    });
  });
});
