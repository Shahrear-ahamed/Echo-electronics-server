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
  return await Product.updateOne({ _id: id }, data, {
    runValidators: true,
  });
};

inventoryService.deleteProductService = async (id) => {
  return await Product.deleteOne({ _id: id });
};

module.exports = inventoryService;
