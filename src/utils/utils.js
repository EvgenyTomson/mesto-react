// Функция показа лоадера:
export function renderLoading(submitButton, submitButtonText, isDisabled) {
  submitButton.textContent = submitButtonText;
  submitButton.disabled = isDisabled;
}
