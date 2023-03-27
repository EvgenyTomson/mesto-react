import { useState } from "react";
import { defaultInputClassName } from "../utils/constants";
import { resetInputValidation, validateInput } from "../utils/ulils";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  // При открытии формы кнопка задизейблена, т.к. инпуты пусты, но ошибки нет, пока пользователь не трогал инпуты
  const defaultValidationData = {status: false, message: '', className: defaultInputClassName};

  const [isNameValid, setIsNameValid] = useState(defaultValidationData);
  const [isLinkValid, setIsLinkValid] = useState(defaultValidationData);

  // Переопределяем функцию закрытия попапа, чтобы перед закрытием сбросить ошибки валидации
  const onFormClose = () => {
    resetInputValidation(setName, setIsNameValid, defaultValidationData);
    resetInputValidation(setLink, setIsLinkValid, defaultValidationData);

    onClose();
  }

  const handleNameOnChange = (evt) => {
    setName(evt.target.value);

    validateInput(evt.target, setIsNameValid);
  };

  const handleLinkOnChange = (evt) => {
    setLink(evt.target.value);

    validateInput(evt.target, setIsLinkValid);
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({name, link});

    resetInputValidation(setName, setIsNameValid, defaultValidationData);
    resetInputValidation(setLink, setIsLinkValid, defaultValidationData);
  }

  return (
    <PopupWithForm
      name='newPlacePopup'
      title='Новое место'
      isOpen={isOpen}
      onClose={onFormClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isValid={isNameValid.status && isLinkValid.status}
    >
      <label htmlFor="placeName" className="popup__field">
        <input type="text" className={isNameValid.className} id="placeName" name="name" required autoComplete="off"
          placeholder="Название" minLength="2" maxLength="30" onChange={handleNameOnChange} value={name} />
        <span className="popup__error placeName-error" >{isNameValid.message}</span>
      </label>
      <label htmlFor="placeLink" className="popup__field">
        <input type="url" className={isLinkValid.className} id="placeLink" name="link" required autoComplete="off"
          placeholder="Ссылка на картинку" onChange={handleLinkOnChange} value={link} />
        <span className="popup__error placeLink-error" >{isLinkValid.message}</span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
