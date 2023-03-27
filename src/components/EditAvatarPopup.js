import { useRef, useState } from "react";
import { defaultInputClassName } from "../utils/constants";
import { resetInputValidation, validateInput } from "../utils/ulils";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {

  // используем реф из-за требования брифа
  const avatar = useRef();

   // При открытии формы кнопка задизейблена, т.к. инпут пуст, но ошибки нет, пока пользователь не трогал инпут
  const defaultValidationData = {status: false, message: '', className: defaultInputClassName};

  const [link, setLink] = useState('');
  const [isLinkValid, setIsLinkValid] = useState(defaultValidationData);

  // Переопределяем функцию закрытия попапа, чтобы перед закрытием сбросить ошибки валидации
  const onFormClose = () => {
    resetInputValidation(setLink, setIsLinkValid, defaultValidationData);

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

    resetInputValidation(setLink, setIsLinkValid, defaultValidationData);
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
        <input ref={avatar} type="url" className={isLinkValid.className} id="avatarLink" name="avatar" required autoComplete="off"
          placeholder="Ссылка на аватар" onChange={handleLinkOnChange} value={link} />
        <span className="popup__error avatarLink-error" >{isLinkValid.message}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
