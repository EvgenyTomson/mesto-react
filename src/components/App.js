import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [isAnyPopupOpen, setIsAnyPopupOpen] = useState(false); //временно

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);

  // это временно
  setIsAnyPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);

  // это временно
  setIsAnyPopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);

  // это временно
  setIsAnyPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);

    setSelectedCard(null);

  // это временно
  setIsAnyPopupOpen(false);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

// это все временно
  useEffect(() => {

    const handleKeydown = (evt) => {
      (evt.key === 'Escape') && closeAllPopups();
    };

    if (isAnyPopupOpen || selectedCard) {
      document.addEventListener('keydown', handleKeydown);

      return () => {
        document.removeEventListener('keydown', handleKeydown);
      }
    }
  }, [isAnyPopupOpen, selectedCard])

  return (
    <div className="body">
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      {/* Попап редактирования профиля */}
      <PopupWithForm
        name='profileEditPopup'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText='Сохранить'
      >
        <>
          <label htmlFor="inputName" className="popup__field">
            <input type="text" className="popup__input" id="inputName" name="name" required autoComplete="off"
              placeholder="Имя" minLength="2" maxLength="40" />
            <span className="popup__error inputName-error" />
          </label>
          <label htmlFor="inputJob" className="popup__field">
            <input type="text" className="popup__input" id="inputJob" name="about" required autoComplete="off"
              placeholder="Вид деятельности" minLength="2" maxLength="200" />
            <span className="popup__error inputJob-error" />
          </label>
        </>
      </PopupWithForm>

      {/* Попап добавления нового места */}
      <PopupWithForm
        name='newPlacePopup'
        title='Новое место'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText='Сохранить'
      >
        <>
          <label htmlFor="placeName" className="popup__field">
            <input type="text" className="popup__input" id="placeName" name="name" required autoComplete="off"
              placeholder="Название" minLength="2" maxLength="30" />
            <span className="popup__error placeName-error" />
          </label>
          <label htmlFor="placeLink" className="popup__field">
            <input type="url" className="popup__input" id="placeLink" name="link" required autoComplete="off"
              placeholder="Ссылка на картинку" />
            <span className="popup__error placeLink-error" />
          </label>
        </>
      </PopupWithForm>

      {/* Попап изменения аватара */}
      <PopupWithForm
        name='editAvatarPopup'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText='Сохранить'
      >
        <>
          <label htmlFor="avatarLink" className="popup__field">
            <input type="url" className="popup__input" id="avatarLink" name="avatar" required autoComplete="off"
              placeholder="Ссылка на аватар" />
            <span className="popup__error avatarLink-error" />
          </label>
        </>
      </PopupWithForm>

      {/* Попап показа изображения из карточки */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
