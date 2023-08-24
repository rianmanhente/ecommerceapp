import api from './api'; // Importe sua instância do axios ou a biblioteca de requisições HTTP que você está usando

export const getProducts = async () => {
  try {
    const res = await api.get('/product');
    const products = res.data;
    return products;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
