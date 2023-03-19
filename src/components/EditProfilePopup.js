import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameOnChange = (evt) => {
    setName(evt.target.value);
  };

  const handleAboutOnChange = (evt) => {
    setDescription(evt.target.value);
  };

  function handleSubmit(evt) {
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });

    setName('');
    setDescription('');
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name='profileEditPopup'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Сохранить'
    >
      <>
        <label htmlFor="inputName" className="popup__field">
          <input type="text" className="popup__input" id="inputName" name="name" required autoComplete="off"
            placeholder="Имя" minLength="2" maxLength="40" onChange={handleNameOnChange} value={name} />
          <span className="popup__error inputName-error" />
        </label>
        <label htmlFor="inputJob" className="popup__field">
          <input type="text" className="popup__input" id="inputJob" name="about" required autoComplete="off"
            placeholder="Вид деятельности" minLength="2" maxLength="200" onChange={handleAboutOnChange} value={description} />
          <span className="popup__error inputJob-error" />
        </label>
      </>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
