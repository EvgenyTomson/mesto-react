import { useRef, useState } from "react";
import { validateInput } from "../utils/ulils";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {

  const avatar = useRef();

  const [link, setLink] = useState('');
  const [isLinkValid, setIsLinkValid] = useState({status: true, message: ''});

  const onFormClose = () => {
    setIsLinkValid({status: true, message: ''});
    setLink('');
    onClose();
  }

  const handleLinkOnChange = (evt) => {
    setLink(evt.target.value);

    validateInput(evt.target, setIsLinkValid);
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar(avatar.current.value);
    avatar.current.value = '';
    setLink('');
  }

  return (
    <PopupWithForm
      name='editAvatarPopup'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onFormClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Схранение...' : 'Сохранить'}
      isValid={isLinkValid.status}
    >
      <label htmlFor="avatarLink" className="popup__field">
        <input ref={avatar} type="url" className="popup__input" id="avatarLink" name="avatar" required autoComplete="off"
          placeholder="Ссылка на аватар" onChange={handleLinkOnChange} value={link} />
        <span className="popup__error avatarLink-error" >{isLinkValid.message}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
