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
        {
          $facet: {
            dataInfo: [{ $group: { _id: 0, totalData: { $sum: 1 } } }],
            items: [{ $skip: skip }, { $limit: limit }, { $sort: sort }],
          },
        },
      ]
    : [
        {
          $facet: {
            dataInfo: [{ $group: { _id: 0, totalData: { $sum: 1 } } }],
            items: [{ $skip: skip }, { $limit: limit }, { $sort: sort }],
          },
        },
      ];
  const allProducts = await Product.aggregate(pipeline);
  const products = allProducts[0];

  const pages = Math.ceil(products.dataInfo[0].totalData / limit);
  return { pages, products: products.items };
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
