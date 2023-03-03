// inventory service import
const {
  getProductsService,
  createProductService,
  getSingleProductService,
} = require("../services/v2/inventory.service");
const { findUserByIdService } = require("../services/v2/user.service");

const inventoryController = {};

// get all items
inventoryController.getProducts = async (req, res) => {
  try {
    const result = await getProductsService();

    // check products has or not
    res.status(200).json({ status: "success", result });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

// get single item
inventoryController.getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await getSingleProductService(id);

    // check product has or not
    if (!result) throw new Error("product not found");

    res.status(200).json({ status: "success", result });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

// create item
inventoryController.createProduct = async (req, res) => {
  try {
    const itemDetails = req.body;
    const id = req.decode.id;

    // find inventory owner
    const user = await findUserByIdService(id);
    if (!user) throw new Error("User not found");

    // add inventory owner to item
    delete itemDetails.owner;
    const product = { ...itemDetails, owner: user._id };
    const result = await createProductService(product);

    if (!result) throw new Error("product are not stored");

    res.status(201).json({ status: "success", result });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

module.exports = inventoryController;
