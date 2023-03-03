// inventory service import
const {
  getProductsService,
  createProductService,
  deleteProductService,
  updateProductService,
  getSingleProductService,
} = require("../services/v2/inventory.service");

// user service import
const {
  findUserByIdService,
  findUserByIdAndMailService,
} = require("../services/v2/user.service");

// inventory controller object
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

// update single item
inventoryController.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const itemDetails = req.body;
    const userId = req.decode.id;
    const userMail = req.decode.email;

    // check user is valid or not
    const user = await findUserByIdAndMailService(userId, userMail);
    if (!user) throw new Error("You are not authorized to update this product");

    // check product has or not
    const product = await getSingleProductService(id);
    if (!product) throw new Error("product not found");

    // update product
    const result = await updateProductService(id, itemDetails);

    if (result.modifiedCount === 0) throw new Error("product are not updated");

    res.status(200).json({ status: "success", result });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

inventoryController.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.decode.id;
    const userMail = req.decode.email;

    // check user is valid or not
    const user = await findUserByIdAndMailService(userId, userMail);
    if (!user) throw new Error("You are not authorized to delete this product");

    // check product has or not
    const product = await getSingleProductService(id);
    if (!product) throw new Error("product not found");

    // delete product
    const result = await deleteProductService(id);

    if (result.deletedCount === 0) throw new Error("product are not deleted");

    res.status(200).json({ status: "success", result });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

module.exports = inventoryController;
