const router = require("express").Router();

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../../controllers/inventory.controller");
const { verifyToken } = require("../../middlewares/jwtToken");

/**
 * @route Get   /api/v2/products - get all products
 * @route POST  /api/v2/products - create or add new product
 */

router.route("/").get(getProducts).post(verifyToken, createProduct);

/**
 * @route GET /api/v2/products/:id - get single product
 * @route PATCH /api/v2/products/:id - update single product
 * @route DELETE /api/v2/products/:id - delete single product
 */

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(verifyToken, updateProduct)
  .delete(verifyToken, deleteProduct);

module.exports = router;
