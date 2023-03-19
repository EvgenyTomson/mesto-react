import { useEffect, useState } from "react";
import { CurrentUserContext, initialUserData } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
// import PopupWithForm from "./PopupWithForm";


function App() {

  const [currentUser, setCurrentUser] = useState(initialUserData);
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  // Состояние, определяющее, открыт ли какой-либо попап. Используется для эффекта закрытия по Esc:
  const [isAnyPopupOpen, setIsAnyPopupOpen] = useState(false);

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, initialCardsData]) => {
        setCurrentUser(userData);
        setCards(initialCardsData);
      })
      .catch(err => console.error(err));
  },[]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);

    setIsAnyPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);

    setIsAnyPopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);

    setIsAnyPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);

    setSelectedCard(null);

    setIsAnyPopupOpen(false);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);

    setIsAnyPopupOpen(true);
  }

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

  // Карточки:
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.toggleCardLikeStatus(card._id, isLiked)
      .then((updatedCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map(c => c._id === card._id ? updatedCard : c);
        setCards(newCards);
      })
      .catch(error => {
        console.error(error);
      })
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        // Формируем новый массив на основе имеющегося, исключая из него удаляемую карточку
        const newCards = cards.filter(c => c._id !== card._id);
        setCards(newCards);
      })
      .catch(error => {
        console.error(error);
      })
  };

  const handleAddPlaceSubmit = (cardData) => {
    api.addNewCard(cardData)
      .then(updatedCardData => {
        setCards([updatedCardData, ...cards]);
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
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        {/* Попап редактирования профиля */}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        {/* Попап добавления нового места */}
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        {/* Попап изменения аватара */}
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

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
