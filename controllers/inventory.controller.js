// inventory service import
const { createItem } = require("../services/v2/inventory.service");
const { findUserByIdService } = require("../services/v2/user.service");

const inventoryController = {};

// create item
inventoryController.createItem = async (req, res) => {
  try {
    const itemDetails = req.body;
    const id = req.decode.id;

    console.log("itemDetails");
    // find inventory owner
    const user = await findUserByIdService(id);
    if (!user) throw new Error("User not found");

    // add inventory owner to item
    delete itemDetails.owner;
    const product = { ...itemDetails, owner: user._id };
    const result = await createItem(product);

    if (!result) throw new Error("product are not stored");

    res.status(201).json({ status: "success", result });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

module.exports = inventoryController;
