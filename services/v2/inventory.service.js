// database model
const Product = require("../../models/Products.model");

const inventoryService = {};

inventoryService.getInventory = async () => {};

inventoryService.createItem = async (item) => {
  return await Product.create(item);
};

module.exports = inventoryService;
