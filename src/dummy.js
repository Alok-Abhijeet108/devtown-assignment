const fs = require('fs');
const axios = require('axios');
const faker = require('faker');

const unsplashAccessKey = '-kmVn0o7yfevgco'; // Replace with your Unsplash API key
const numberOfProducts = 50;

const generateRandomProduct = async () => {
  try {
    const response = await axios.get(`https://api.unsplash.com/photos/random?client_id=${unsplashAccessKey}`);
    const image = response.data.urls.regular;

    return {
      image,
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.lorem.sentence(),
      color: faker.commerce.color(),
    };
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error);
    return null;
  }
};

const generateProducts = async () => {
  const products = [];
  for (let i = 0; i < numberOfProducts; i++) {
    const product = await generateRandomProduct();
    if (product) {
      products.push(product);
    }
  }

  // Write products to a JSON file
  const productsJSON = JSON.stringify(products, null, 2);
  fs.writeFileSync('products.json', productsJSON);

  console.log('products.json file created');
};

generateProducts();
