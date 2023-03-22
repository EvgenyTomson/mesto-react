import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { defaultInputClassName } from "../utils/constants";
import { resetInputValidation, validateInput } from "../utils/ulils";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const defaultValidationData = {status: true, message: '', className: defaultInputClassName};

  const [isNameValid, setIsNameValid] = useState(defaultValidationData);
  const [isDescriptionValid, setIsDescriptionValid] = useState(defaultValidationData);

  const onFormClose = () => {
    resetInputValidation(setName, setIsNameValid, defaultValidationData);
    resetInputValidation(setDescription, setIsDescriptionValid, defaultValidationData);

    onClose();
  }

  const handleNameOnChange = (evt) => {
    setName(evt.target.value);

    validateInput(evt.target, setIsNameValid);
  };

  const handleAboutOnChange = (evt) => {
    setDescription(evt.target.value);

    validateInput(evt.target, setIsDescriptionValid);
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });

    // resetInputValidation(setName, setIsNameValid, defaultValidationData);
    // resetInputValidation(setDescription, setIsDescriptionValid, defaultValidationData);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name='profileEditPopup'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onFormClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
      isValid={isNameValid.status && isDescriptionValid.status}
    >
      <label htmlFor="inputName" className="popup__field">
        <input type="text" className={isNameValid.className} id="inputName" name="name" required autoComplete="off"
          placeholder="Имя" minLength="2" maxLength="40" onChange={handleNameOnChange} value={name} />
        <span className="popup__error" >{isNameValid.message}</span>
      </label>
      <label htmlFor="inputJob" className="popup__field">
        <input type="text" className={isDescriptionValid.className} id="inputJob" name="about" required autoComplete="off"
          placeholder="Вид деятельности" minLength="2" maxLength="200" onChange={handleAboutOnChange} value={description} />
        <span className="popup__error inputJob-error" >{isDescriptionValid.message}</span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
