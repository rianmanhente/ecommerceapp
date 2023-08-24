const Producto = require("../../models/Producto");

const seedProducto = async function () {
  try {
    await Producto.sync({ force: true });

    const products = [];

    const productsData = [
      {
        name: "headfone",
        price: 29.99,
        description: "Descrição do produto 2", 
        image: "1687349869895-images.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "iphone",
        price: 19.99,
        description: "Descrição do produto 1",
        image: "1687742191893-download.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    for (let i = 0; i < productsData.length; i++) {
      const producto = await Producto.create(productsData[i]);
      products.push(producto);
    }

    console.log("Products created:", products);
  } catch (err) {
    console.log(err);
  }
};

module.exports = seedProducto;
