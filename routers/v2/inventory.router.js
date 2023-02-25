const router = require("express").Router();

const { createItem } = require("../../controllers/inventory.controller");
const { verifyToken } = require("../../middlewares/jwtToken");

router.post("/addProduct", verifyToken, createItem);

module.exports = router;
