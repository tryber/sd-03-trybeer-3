const { allSalesProduct, registerProduct } = require('./individualProductController');
const rescue = require('express-rescue');

describe('Teste de controle de produtos', () => {
  test('Testando o retorno dos produtos de cada venda', async () => {
    const result = await allSalesProduct();
    console.log(result);
    expect(result);
})
test('Testando o registro de produtos', async () => {
    const req = {body: {saleId: 1, productId : 2, quantity : 4 }}
    const result = await registerProduct(req);
    expect(result).toBe(200);
})
})