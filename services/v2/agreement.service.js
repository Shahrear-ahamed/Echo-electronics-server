const Agreement = require("../../models/agreement.model");

const agreementService = {};

agreementService.getSingleAgreement = async (agreementId) => {
  return Agreement.findById(agreementId);
};

agreementService.getAgreements = async () => {
  return Agreement.find({});
};

agreementService.createAgreement = async (agreement) => {
  return Agreement.create(agreement);
};

agreementService.updateAgreement = async (agreementId, agreement) => {
  return Agreement.findByIdAndUpdate(agreementId, agreement, { new: true });
};

agreementService.deleteAgreement = async (agreementId) => {
  return Agreement.deleteOne({ _id: agreementId });
};

module.exports = agreementService;
