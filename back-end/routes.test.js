const request = require('supertest');
const app = require('./index');
const connect = require('./models/connection');

afterEach(async () => {
  await connect();
});
describe('Testando Login', () => {
  it('Testando o login correto', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'bruno.batista@gmail.com',
        password: '12345678',
      });
    expect(res.statusCode).toEqual(200);
  });
  it('Testando o login incorreto', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'bruno.batista@gmail.com',
        password: '1234',
      });
    expect(res.statusCode).toEqual(401);
  });
  it('Testando o login sem email', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        password: '1234',
      });
    expect(res.statusCode).toEqual(500);
  });
});

describe('Testando produtos indiviudais', () => {
  test('Testando a pesquisa por produtos indiviudais', async () => {
    const res = await request(app)
      .get('/individualProduct');
    expect(res.statusCode).toEqual(200);
  });
  test('Testando a inserção de produtos para uma venda', async () => {
    const connection = await connect().then((db) => db.getTable('sales_products'));
    connection.delete().where('sale_id = 1')
      .execute();
    const res = await request(app)
      .post('/individualProduct')
      .send({
        saleId: 1, productId: 7, quantity: 2,
      });
    expect(res.statusCode).toEqual(200);
  });
  test('Testando erro na inserção de produtos para uma venda', async () => {
    const res = await request(app)
      .post('/individualProduct')
      .send({
        saleId: 1, productId: 7, quantity: 2,
      });
    expect(res.statusCode).toEqual(500);
  });
});

describe('Testando produtos', () => {
  test('Testando o retorno da lista de produtos', async () => {
    const res = await request(app)
      .get('/products');
    expect(res.statusCode).toEqual(200);
  });
});

describe('Testando Perfil', () => {
  test('Testando o retorno das informações do Perfil', async () => {
    const res = await request(app)
      .put('/profile')
      .send({ name: 'Bruno Silva Batista',
        email: 'bruno.batista@gmail.com',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJuYW1lIjoiQnJ1bm8gU2lsdmEgQmF0aXN0YSIsImVtYWlsIjoiYnJ1bm8uYmF0aXN0YUBnbWFpbC5jb20iLCJyb2xlIjoiY2xpZW50In0sImlhdCI6MTYwMTg0MDE1MywiZXhwIjoxNjAzNTY4MTUzfQ.S0TH3VFOKbowDDgeZJSHhYPZKbW0Giu1ovRIiuru_Rs',
      });
    expect(res.statusCode).toEqual(200);
  });
  test('Testando erro no  retorno das informações do Perfil sem token', async () => {
    const res = await request(app)
      .put('/profile')
      .send({ name: 'Bruno Silva Batista',
        email: 'bruno.batista@gmail.com',
        token: '',
      });
    expect(res.statusCode).toEqual(401);
  });
  test('Testando erro no  retorno das informações do Perfil sem o Email', async () => {
    const res = await request(app)
      .put('/profile')
      .send({ name: 'Bruno Silva Batista',
        email: '',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJuYW1lIjoiQnJ1bm8gU2lsdmEgQmF0aXN0YSIsImVtYWlsIjoiYnJ1bm8uYmF0aXN0YUBnbWFpbC5jb20iLCJyb2xlIjoiY2xpZW50In0sImlhdCI6MTYwMTg0MDE1MywiZXhwIjoxNjAzNTY4MTUzfQ.S0TH3VFOKbowDDgeZJSHhYPZKbW0Giu1ovRIiuru_Rs',
      });
    expect(res.statusCode).toEqual(500);
  });
});

describe('Testando o Registro', () => {
  test('Registrando um usuário', async () => {
    await connect()
      .then((db) => {
        db.getTable('users')
          .delete()
          .where('email = "cpereiramt@gmail.com"')
          .execute();
      });
    const res = await request(app)
      .post('/register')
      .send({ name: 'clayton pereira',
        email: 'cpereiramt@gmail.com',
        password: '12345678',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJuYW1lIjoiQnJ1bm8gU2lsdmEgQmF0aXN0YSIsImVtYWlsIjoiYnJ1bm8uYmF0aXN0YUBnbWFpbC5jb20iLCJyb2xlIjoiY2xpZW50In0sImlhdCI6MTYwMTg0MDE1MywiZXhwIjoxNjAzNTY4MTUzfQ.S0TH3VFOKbowDDgeZJSHhYPZKbW0Giu1ovRIiuru_Rs',
        role: 'comum',
      });
    expect(res.statusCode).toEqual(200);
  });
});

describe('Testando as vendas', () => {
  test('Testando a pesquisa de vendas', async () => {
    const res = await request(app)
      .get('/sales');
    expect(res.status).toEqual(200);
  });
  test('Testando a inserção de uma venda', async () => {
    const res = await request(app)
      .post('/sales')
      .send({
        email: 'bruno.batista@gmail.com',
        total: '5',
        address: 'rua 16',
        number: '2',
        date: '2020/05/01',
      });
    expect(res.status).toEqual(200);
  });
  test('Testando a alteração do status da venda', async () => {
    const res = await request(app)
      .put('/sales')
      .send({
        id: '1',
      });
    expect(res.status).toEqual(200);
  });
});
