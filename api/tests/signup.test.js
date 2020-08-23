const request = require('supertest');
const app = require("../../app")

describe('test the user sign up', () => {

  it('Should show status 404 Not found when url is wrong!', async (done) => {
    const user = {
      full_name: "Valens",
      email: 'testing@gmail.com',
      password: 'testingPassword',
      status: 'ACTIVE'
    };
      const res = await request(app).post('/users/sign_up_').send(user)
          .expect(404);
      done();
  });
});