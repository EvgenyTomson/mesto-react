import { useState } from "react";
import { validateInput } from "../utils/ulils";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const [isNameValid, setIsNameValid] = useState({status: true, message: ''});
  const [isLinkValid, setIsLinkValid] = useState({status: true, message: ''});

  const onFormClose = () => {
    setIsNameValid({status: true, message: ''});
    setIsLinkValid({status: true, message: ''});
    setName('');
    setLink('');
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
    setName('');
    setLink('');
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
        <input type="text" className="popup__input" id="placeName" name="name" required autoComplete="off"
          placeholder="Название" minLength="2" maxLength="30" onChange={handleNameOnChange} value={name} />
        <span className="popup__error placeName-error" >{isNameValid.message}</span>
      </label>
      <label htmlFor="placeLink" className="popup__field">
        <input type="url" className="popup__input" id="placeLink" name="link" required autoComplete="off"
          placeholder="Ссылка на картинку" onChange={handleLinkOnChange} value={link} />
        <span className="popup__error placeLink-error" >{isLinkValid.message}</span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
