import { useState } from "react";
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

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
    // document.querySelector('#editAvatarPopup').classList.add('popup_opened');
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
    // document.querySelector('#profileEditPopup').classList.add('popup_opened');
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
    // document.querySelector('#newPlacePopup').classList.add('popup_opened');
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);

    setSelectedCard(null);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

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
      <PopupWithForm name='profileEditPopup' title='Редактировать профиль' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
        children={<>
          <label htmlFor="inputName" className="popup__field">
            <input type="text" className="popup__input" id="inputName" name="name" required autoComplete="off"
              placeholder="Имя" minLength="2" maxLength="40" />
            <span className="popup__error inputName-error"></span>
          </label>
          <label htmlFor="inputJob" className="popup__field">
            <input type="text" className="popup__input" id="inputJob" name="about" required autoComplete="off"
              placeholder="Вид деятельности" minLength="2" maxLength="200" />
            <span className="popup__error inputJob-error"></span>
          </label></>
        } />

      {/* Попап добавления нового места */}
      <PopupWithForm name='newPlacePopup' title='Новое место' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
        children={<>
          <label htmlFor="placeName" className="popup__field">
            <input type="text" className="popup__input" id="placeName" name="name" required autoComplete="off"
              placeholder="Название" minLength="2" maxLength="30" />
            <span className="popup__error placeName-error"></span>
          </label>
          <label htmlFor="placeLink" className="popup__field">
            <input type="url" className="popup__input" id="placeLink" name="link" required autoComplete="off"
              placeholder="Ссылка на картинку" />
            <span className="popup__error placeLink-error"></span>
          </label></>
        } />

      {/* Попап изменения аватара */}
      <PopupWithForm name='editAvatarPopup' title='Обновить аватар' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
        children={<>
          <label htmlFor="avatarLink" className="popup__field">
            <input type="url" className="popup__input" id="avatarLink" name="avatar" required autoComplete="off"
              placeholder="Ссылка на аватар" />
            <span className="popup__error avatarLink-error"></span>
          </label></>
        } />

      {/* Попап показа изображения из карточки */}
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      {/* <!-- Popup Edit Profile --> */}
      {/* <div className="popup" id="profileEditPopup">
        <div className="popup__container">
          <form action="#" className="popup__form" name="profile" noValidate>
            <button className="popup__close" type="button" aria-label="Закрыть окно редактирования"></button>
            <h2 className="popup__title">Редактировать профиль</h2>
            <label htmlFor="inputName" className="popup__field">
              <input type="text" className="popup__input" id="inputName" name="name" required autoComplete="off"
                placeholder="Имя" minLength="2" maxLength="40" />
              <span className="popup__error inputName-error"></span>
            </label>
            <label htmlFor="inputJob" className="popup__field">
              <input type="text" className="popup__input" id="inputJob" name="about" required autoComplete="off"
                placeholder="Вид деятельности" minLength="2" maxLength="200" />
              <span className="popup__error inputJob-error"></span>
            </label>
            <button className="popup__submit" type="submit">Сохранить</button>
          </form>
        </div>
      </div> */}

      {/* <!-- Popup Add New Place --> */}
      {/* <div className="popup" id="newPlacePopup">
        <div className="popup__container">
          <form action="#" className="popup__form" name="newplace" noValidate>
            <button className="popup__close" type="button" aria-label="Закрыть окно"></button>
            <h2 className="popup__title">Новое место</h2>
            <label htmlFor="placeName" className="popup__field">
              <input type="text" className="popup__input" id="placeName" name="name" required autoComplete="off"
                placeholder="Название" minLength="2" maxLength="30" />
              <span className="popup__error placeName-error"></span>
            </label>
            <label htmlFor="placeLink" className="popup__field">
              <input type="url" className="popup__input" id="placeLink" name="link" required autoComplete="off"
                placeholder="Ссылка на картинку" />
              <span className="popup__error placeLink-error"></span>
            </label>
            <button className="popup__submit" type="submit">Создать</button>
          </form>
        </div>
      </div> */}

      {/* <!-- Popup View Place Image--> */}
      <div className="popup popup_type_big" id="viewImagePopup">
        <div className="popup__container popup__container_type_big">
            <button className="popup__close" type="button" aria-label="Закрыть окно"></button>
            <figure className="popup__figure">
              <img src="#" alt="" className="popup__image" />
              <figcaption className="popup__caption"></figcaption>
            </figure>
        </div>
      </div>

      {/* <!-- Popup Delete Own Card --> */}
      <div className="popup popup_type_small" id="deleteOwnCardPopup">
        <div className="popup__container popup__container_type_small">
          <form action="#" className="popup__form" name="deletecard" noValidate>
            <button className="popup__close" type="button" aria-label="Закрыть окно"></button>
            <h2 className="popup__title popup__title_type_delete">Вы уверены?</h2>
            <button className="popup__submit" type="submit">Да</button>
          </form>
        </div>
      </div>

      {/* <!-- Popup Edit Avatar --> */}
      {/* <div className="popup" id="editAvatarPopup">
        <div className="popup__container">
          <form action="#" className="popup__form" name="avataredit" noValidate>
            <button className="popup__close" type="button" aria-label="Закрыть окно"></button>
            <h2 className="popup__title">Обновить аватар</h2>
            <label htmlFor="avatarLink" className="popup__field">
              <input type="url" className="popup__input" id="avatarLink" name="avatar" required autoComplete="off"
                placeholder="Ссылка на аватар" />
              <span className="popup__error avatarLink-error"></span>
            </label>
            <button className="popup__submit" type="submit">Сохранить</button>
          </form>
        </div>
      </div> */}

      {/* <!-- Шаблон своей карточки --> */}
      <template id="cardTemplate">
        <li className="card">
          <button className="card__delete" type="button" aria-label="Удалить карточку"></button>
          <img src="#" alt="" className="card__image" />
          <div className="card__description">
            <h2 className="card__title">#</h2>
            <div className="card__like-section">
              <button className="card__like" type="button" aria-label="Поставить лайк"></button>
              <span className="card__likes-count">6</span>
            </div>
          </div>
        </li>
      </template>

      {/* Шаблон чужой карточки */}
      <template id="foreignCardTemplate">
        <li className="card">
          <img src="#" alt="" className="card__image" />
          <div className="card__description">
            <h2 className="card__title">#</h2>
            <div className="card__like-section">
              <button className="card__like" type="button" aria-label="Поставить лайк"></button>
              <span className="card__likes-count">3</span>
            </div>
          </div>
        </li>
      </template>

    </div>
  );
}

export default App;
