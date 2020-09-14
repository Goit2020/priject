const request = require('supertest');
const db = require('../src/db');
const startServer = require('../src/server');
const { deleteSession, createSession } = require('../src/instances/session');
const {
  createUser,
  deleteUser,
  findUserByEmail,
} = require('../src/instances/user');
const { setPasswordHash } = require('../src/helpers/encryption');
const { generateToken } = require('../src/helpers/token');
const sequelize = require('../src/helpers/sequelize');

require('dotenv').config();

describe('POST /auth/sign-up', () => {
  let app;
  let createdUser;
  const port = process.env.PORT || 3000;
  const existingEmail = `${
    Math.floor(Math.random() * (10000 - 1)) + 1
  }@mail.com`;

  beforeAll(async () => {
    await db();
    app = await startServer(port);
    createdUser = {
      username: 'testname',
      email: existingEmail,
      password: 'test',
    };
  });

  afterAll(async () => {
    const user = await findUserByEmail(existingEmail);
    await deleteUser(user.id);
    await deleteSession(user.id);
    app.close();
  });

  it('should registrate user', async () => {
    const response = await request(app)
      .post('/auth/sign-up')
      .set('Content-Type', 'application/json')
      .send(createdUser)
      .expect(201);

    const responseBody = response.body;
    expect(responseBody).toBeDefined();
    expect(responseBody).toHaveProperty('user');
    expect(responseBody.user).toHaveProperty('email');
    expect(responseBody.user).toHaveProperty('username');
    expect(responseBody.user).toHaveProperty('balance');
  });

  it('should return 400', async () => {
    await request(app)
      .post('/auth/sign-up')
      .set('Content-Type', 'application/json')
      .send({
        email: 22,
        password: 21,
        username: 'testname',
      })
      .expect(400);
  });

  it('should return 409', async () => {
    await request(app)
      .post('/auth/sign-up')
      .set('Content-Type', 'application/json')
      .send({
        email: existingEmail,
        password: 'test',
        username: 'testname',
      })
      .expect(409);
  });
});

describe('POST /auth/sign-in', () => {
  let app;
  let createdUser;
  const port = process.env.PORT || 3000;

  beforeAll(async () => {
    await db();
    app = await startServer(port);
    createdUser = await createUser({
      username: 'testname',
      email: 'test@mail.com',
      passwordHash: await setPasswordHash('test'),
    });
  });

  afterAll(async () => {
    await deleteUser(createdUser.id);
    await deleteSession(createdUser.id);
    await app.close();
  });

  describe('When user successful login', () => {
    it('should login user', async () => {
      const response = await request(app)
        .post('/auth/sign-in')
        .set('Content-Type', 'application/json')
        .send({
          email: 'test@mail.com',
          password: 'test',
        })
        .expect(201);

      const responseBody = response.body;
      expect(responseBody).toBeDefined();
      expect(responseBody).toHaveProperty('user');
      expect(responseBody.user).toHaveProperty('id');
      expect(responseBody.user).toHaveProperty('email');
      expect(responseBody.user).toHaveProperty('username');
    });
  });

  describe('When client recieves error ', () => {
    it('should return 400', async () => {
      await request(app)
        .post('/auth/sign-in')
        .set('Content-Type', 'application/json')
        .send({
          email: 'test7@mail.com',
          password: 21,
          username: 'testname',
        })
        .expect(400);
    });

    it('should return 404', async () => {
      await request(app)
        .post('/auth/sign-in')
        .set('Content-Type', 'application/json')
        .send({
          email: 'not-exist@mail.com',
          password: 'tttt',
        })
        .expect(404);
    });

    it('should return 403', async () => {
      await request(app)
        .post('/auth/sign-in')
        .set('Content-Type', 'application/json')
        .send({
          email: 'test@mail.com',
          password: 'dasdsa',
        })
        .expect(403);
    });
  });
});

describe('POST /auth/sign-out', () => {
  let app;
  let createdUser;
  let validToken;
  let inValidToken;
  let newSession;

  const port = 3000;

  beforeAll(async () => {
    await db();
    app = await startServer(port);

    createdUser = await createUser({
      username: 'testname',
      email: 'test@mail.com',
      passwordHash: await setPasswordHash('test'),
    });

    newSession = await createSession(createdUser.id);
    validToken = generateToken(newSession.dataValues.id);
    inValidToken = generateToken(-100);
  });

  afterAll(async () => {
    await deleteSession(createdUser.id);
    await deleteUser(createdUser.id);
    await app.close();
  });

  describe('When user successful logout', () => {
    it('should return 204', async () => {
      await request(app)
        .post('/auth/sign-out')
        .set('Cookie', `token=${validToken}`)
        .expect(204);
    });
  });

  describe('When unauthorized', () => {
    it('should return 401', async () => {
      await request(app)
        .post('/auth/sign-out')
        .set('Cookie', `token=${inValidToken}`)
        .expect(401);
    });
  });

  describe('When token is missing', () => {
    it('should return 401', async () => {
      await request(app)
        .post('/auth/sign-out')
        .set('Cookie', `token=`)
        .expect(401);
    });
  });
});
