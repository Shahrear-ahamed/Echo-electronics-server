const router = require("express").Router();
const { verifyToken } = require("../../middlewares/jwtToken");

// import controllers
const {
  createAgreement,
  updateAgreement,
  deleteAgreement,
  getAgreements,
  getSingleAgreement,
} = require("../../controllers/agreement.controller");

// routes
router.get("/", verifyToken, getAgreements).post("/", createAgreement);
router.get("/:id", verifyToken, getSingleAgreement);
router.post("/:id", verifyToken, updateAgreement);
router.delete("/:id", verifyToken, deleteAgreement);

module.exports = router;
