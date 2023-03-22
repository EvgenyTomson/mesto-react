import { defaultInputClassName, errorInputClassName } from "./constants";

export const validateInput = (input, validityStateCallback) => {
  validityStateCallback({
    status: input.validity.valid,
    message: input.validationMessage,
    className: input.validity.valid ? defaultInputClassName : errorInputClassName});
};

export const resetInputValidation = (inputValueStateCallback, inputVilidityStateCallback, validityData) => {
  inputValueStateCallback('');
  inputVilidityStateCallback(validityData);
}
