// database model
const Product = require("../../models/Products.model");

const inventoryService = {};

inventoryService.getProductsService = async () => {
  return await Product.aggregate([]);
};

inventoryService.getSingleProductService = async (id) => {
  return await Product.aggregate([{ $match: { _id: id } }]);
};

inventoryService.createProductService = async (item) => {
  return await Product.create(item);
};

inventoryService.updateProductService = async (id, data) => {
  return await Product.updateOne();
};

module.exports = inventoryService;
