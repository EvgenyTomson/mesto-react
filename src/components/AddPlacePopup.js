import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleNameOnChange = (evt) => {
    setName(evt.target.value);
  };

  const handleLinkOnChange = (evt) => {
    setLink(evt.target.value);
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
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Сохранить'
    >
      <label htmlFor="placeName" className="popup__field">
        <input type="text" className="popup__input" id="placeName" name="name" required autoComplete="off"
          placeholder="Название" minLength="2" maxLength="30" onChange={handleNameOnChange} value={name} />
        <span className="popup__error placeName-error" />
      </label>
      <label htmlFor="placeLink" className="popup__field">
        <input type="url" className="popup__input" id="placeLink" name="link" required autoComplete="off"
          placeholder="Ссылка на картинку" onChange={handleLinkOnChange} value={link} />
        <span className="popup__error placeLink-error" />
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
