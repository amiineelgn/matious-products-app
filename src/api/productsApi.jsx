// Fetch data from API, Get All Products
const getProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    return response;
  } catch (error) {
    alert("Error: " + error.message);
  }
};

// Fetch data get all Products By Category
const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/category/" + category
    );
    return response;
  } catch (error) {
    alert("Error: " + error.message);
  }
};

export default {
  getProductsByCategory,
  getProducts,
};
