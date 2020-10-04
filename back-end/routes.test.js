const request = require('supertest')
const  app  = require('./index')
const connect = require('./models/connection')
 afterEach(async () =>{
  await connect() 

}) 
describe('Teste de Login', () => {
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

describe('Testando produtos indiviudais',  () => {
  test('Testando a pesquisa por produtos indiviudais', async () => {
    const res = await request(app)
    .get('/individualProduct')
    expect(res.statusCode).toEqual(200);
  })
  test('Testando a inserção de produtos para uma venda', async () => {
    await connect()
    .then((db) => {
     db.getTable('sales_products')
     .delete().where('sale_id = 1')
     .execute()
    })
    const res = await request(app)
    .post('/individualProduct')
    .send({
      saleId: 1 , productId: 7 , quantity: 2
    })
    expect(res.statusCode).toEqual(200);
  })
  test('Testando erro na inserção de produtos para uma venda', async () => {
    const res = await request(app)
    .post('/individualProduct')
    .send({
      saleId: 1 , productId: 7 , quantity: 2
    })
    expect(res.statusCode).toEqual(500);
  }) 
})