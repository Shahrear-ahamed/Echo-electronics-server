const {
  createAgreement,
  updateAgreement,
  deleteAgreement,
  getAgreements,
  getSingleAgreement,
} = require("../services/v2/agreement.service");

const agreementController = {};

agreementController.createAgreement = async (req, res) => {
  try {
    const agreement = req.body;

    const result = await createAgreement(agreement);
    res.status(201).json({ status: "success", result });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

agreementController.getSingleAgreement = async (req, res) => {
  try {
    const agreementId = req.params?.id;
    const result = await getSingleAgreement(agreementId);
    res.status(200).json({ status: "success", result });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

agreementController.getAgreements = async (req, res) => {
  try {
    const result = await getAgreements();
    res.status(200).json({ status: "success", result });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

agreementController.updateAgreement = async (req, res) => {
  try {
    const agreementId = req.params?.id;
    const agreement = req.body;
    const result = await updateAgreement(agreementId, agreement);
    res.status(200).json({ status: "success", result });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

agreementController.deleteAgreement = async (req, res) => {
  try {
    const agreementId = req.params?.id;
    const result = await deleteAgreement(agreementId);
    res.status(200).json({ status: "success", result });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
};

module.exports = agreementController;
