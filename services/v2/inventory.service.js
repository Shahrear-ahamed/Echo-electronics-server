// database model
const Product = require("../../models/Products.model");

// mongoose types
const { Types } = require("mongoose");

const inventoryService = {};

// get all items
inventoryService.getProductsService = async (
  supplierMail,
  limit,
  skip,
  sort
) => {
  const pipeline = supplierMail
    ? [
        { $match: { supplierMail } },
        { $skip: skip },
        { $limit: limit },
        { $sort: sort },
      ]
    : [{ $skip: skip }, { $limit: limit }, { $sort: sort }];
  return await Product.aggregate(pipeline);
};

// get single item
inventoryService.getSingleProductService = async (id) => {
  const userId = new Types.ObjectId(id);
  return await Product.aggregate([{ $match: { _id: userId } }]);
};

// get single item
inventoryService.createProductService = async (item) => {
  return await Product.create(item);
};

// create item
inventoryService.updateProductService = async (id, data) => {
  const userId = new Types.ObjectId(id);
  return await Product.updateOne({ _id: userId }, data, {
    runValidators: true,
  });
};

// delete item
inventoryService.deleteProductService = async (id) => {
  const userId = new Types.ObjectId(id);
  return await Product.deleteOne({ _id: userId });
};

module.exports = inventoryService;
