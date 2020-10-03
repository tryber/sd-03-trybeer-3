const request = require('supertest')
const  app  = require('./index')
const connect = require('./models/connection')
 afterEach(async () =>{
  await connect().catch(error => console.log(error)) 

}) 
describe('Teste de Post', () => {
  it('Testando o login correto', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'bruno.batista@gmail.com',
        password: '12345678',
      })
    expect(res.statusCode).toEqual(200)
  })
  it('Testando o login incorreto', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'bruno.batista@gmail.com',
        password: '1234',
      })
    expect(res.statusCode).toEqual(401)
  })
  it('Testando o login sem email', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        password: '1234',
      })
    expect(res.statusCode).toEqual(500)
  })
})