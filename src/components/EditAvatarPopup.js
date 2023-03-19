import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatar = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar(avatar.current.value);
    avatar.current.value = '';
  }

  return (
    <PopupWithForm
      name='editAvatarPopup'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Сохранить'
    >
      <>
        <label htmlFor="avatarLink" className="popup__field">
          <input ref={avatar} type="url" className="popup__input" id="avatarLink" name="avatar" required autoComplete="off"
            placeholder="Ссылка на аватар" />
          <span className="popup__error avatarLink-error" />
        </label>
      </>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
