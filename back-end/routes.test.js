const request = require('supertest')
const  app  = require('./index')
const connect = require('./models/connection')
afterEach(async () =>{
  await connect().catch(error => console.log(error)) 

})

describe('Teste de Post', () => {
  it('Testando login', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'teste@teste.com.br',
        password: '123456',
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('post')
    done()
  })
})