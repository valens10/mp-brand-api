const request = require('supertest');
const app = require("../../app")

var mongoose = require('mongoose'),
    User = mongoose.model('Users');
const db = require("../../db")


describe('Test user sign up', () => {
  beforeAll(async () => {
    await db;
  });
  afterEach(async () => {
    await User.deleteMany();
  });
  it('Should return 201 if user created successfully', async (done) => {
    const user = {
      full_name: 'testing Name',
      email: 'testing@example.com',
      status:"ACTIVE",
      password: 'passwordTesting'
    };
    const res = await request(app).post('/user/sign_up').send(user);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('message');
    expect(res.body.user).toHaveProperty('email', user.email);
    done();
  });
});