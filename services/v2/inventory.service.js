// database model
const Product = require("../../models/Products.model");

const inventoryService = {};

// get all items
inventoryService.getProductsService = async () => {
  return await Product.aggregate([]);
};

// get my or single user items
inventoryService.getMyProductsService = async (email) => {
  return await Product.aggregate([{ $match: { email } }]);
};

// get single item
inventoryService.getSingleProductService = async (id) => {
  return await Product.aggregate([{ $match: { _id: id } }]);
};

// get single item
inventoryService.createProductService = async (item) => {
  return await Product.create(item);
};

// create item
inventoryService.updateProductService = async (id, data) => {
  return await Product.updateOne({ _id: id }, data, {
    runValidators: true,
  });
};

// delete item
inventoryService.deleteProductService = async (id) => {
  return await Product.deleteOne({ _id: id });
};

module.exports = inventoryService;
