const Producto = require("../../models/Producto");

const seedProducto = async function () {
  try {
    await Producto.sync({ force: true });

    const products = [];

    const productsData = [
      {
        name: "headfone",
        price: 29.99,
        id: 1,
        // cartItem: 1,
        category: "Headfones", 
        image: "1687349869895-images.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "iphone",
        price: 19.99,
        id: 2,
        category: "Smartphones",
        image: "1687742191893-download.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Headphone Modular",
        price: 39.99,
        id: 3,
        category: "Headfones",
        image: "1684012116006-headphone.jpg",
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
