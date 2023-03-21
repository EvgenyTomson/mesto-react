import PopupWithForm from "./PopupWithForm";

function DeleteOwnCardPopup({isOpen, onClose, onCardDelete, cardToDelete, isLoading}) {

  function handleSubmit(evt) {
    evt.preventDefault();

    // Передаём удаляемую карточку во внешний обработчик
    onCardDelete(cardToDelete);
  }

  return (
    <PopupWithForm
    name='profileEditPopup'
    title='Редактировать профиль'
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    buttonText={isLoading ? 'Удаление...' : 'Да'}
    isValid={true}
    />
  )
}

export default DeleteOwnCardPopup;
