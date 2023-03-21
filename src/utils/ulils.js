export const validateInput = (input, messageStateCallback) => {
  messageStateCallback({status: input.validity.valid, message: input.validationMessage});
};
