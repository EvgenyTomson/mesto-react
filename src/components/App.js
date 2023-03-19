import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";


function App() {

  const [currentUser, setCurrentUser] = useState(useContext(CurrentUserContext));//useState(initialUserData);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isAnyPopupOpen, setIsAnyPopupOpen] = useState(false); //временно

  useEffect(() => {
    api.getUserData()
      .then(userData => {
        setCurrentUser(userData);
      })
      .catch(err => console.error(err));
  },[]);

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
    // это временно
    setIsAnyPopupOpen(true);
  }

  // const handleOnTransitionEnd = () => {
  //   setSelectedCard(null);
  // }

// Закрытие попапов по Esc:
  useEffect(() => {

    const handleKeydown = (evt) => {
      (evt.key === 'Escape') && closeAllPopups();
    };

    if (isAnyPopupOpen) {
      document.addEventListener('keydown', handleKeydown);

      return () => {
        document.removeEventListener('keydown', handleKeydown);
      }
    }
  }, [isAnyPopupOpen]);

  const handleUpdateUser = (userData) => {
    api.editUserData(userData)
      .then(updatedUserData => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch(error => {
        console.error(error);
      })
  };

  const handleUpdateAvatar = (avatarUrl) => {
    api.editUserAvatar(avatarUrl)
      .then(updatedUserData => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch(error => {
        console.error(error);
      })
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        {/* <PopupWithForm
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
        </PopupWithForm> */}

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
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        {/* <PopupWithForm
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
        </PopupWithForm> */}

        {/* Попап показа изображения из карточки */}
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
