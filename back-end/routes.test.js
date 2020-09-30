const request = require('supertest')
const  app  = require('./index')
const connect = require('./models/connection');

describe('Post Endpoints', () => {
    beforeAll(() => {
        connect();
    });
  it('Testando login', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        userEmail: 'teste@teste.com.br',
        UserPassword: '123456',
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('post')
    done()
  })
})