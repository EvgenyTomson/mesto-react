import logo from './img/logo.svg';

function App() {
  return (
    <div class="body">
      <header class="header">
        <img src={logo} alt=" Логотип Место." class="header__logo" />
      </header>

      <main class="content">
        {/* <!-- Profile --> */}
        <section class="profile">
          <div class="profile__current">
            <div class="profile__avatar-outer">
              <button class="profile__avatar-button" type="button" aria-label="Изменить аватар">
                <img src="<%=require('./img/avatar.png')%>" alt=" Аватар пользователя." class="profile__avatar" />
              </button>
            </div>
            <div class="profile__info">
              <div class="profile__title">
                <h1 class="profile__name">Жак-Ив Кусто</h1>
                <button class="profile__edit" type="button" aria-label="Редактировать профиль"></button>
              </div>
              <p class="profile__about">Исследователь океана</p>
            </div>
          </div>
          <button class="profile__add-place" type="button" aria-label="Добавить место"></button>
        </section>
        {/* <!-- Elements --> */}
        <section class="elements">
          <ul class="elements__cards">
          </ul>
        </section>
      </main>

      <footer class="footer">
        <p class="footer__copyright">© 2022 Mesto Russia</p>
      </footer>

      {/* <!-- Popup Edit Profile --> */}
      <div class="popup" id="profileEditPopup">
        <div class="popup__container">
          <form action="#" class="popup__form" name="profile" novalidate>
            <button class="popup__close" type="button" aria-label="Закрыть окно редактирования"></button>
            <h2 class="popup__title">Редактировать профиль</h2>
            <label for="inputName" class="popup__field">
              <input type="text" class="popup__input" id="inputName" name="name" required autocomplete="off"
                placeholder="Имя" minlength="2" maxlength="40" />
              <span class="popup__error inputName-error"></span>
            </label>
            <label for="inputJob" class="popup__field">
              <input type="text" class="popup__input" id="inputJob" name="about" required autocomplete="off"
                placeholder="Вид деятельности" minlength="2" maxlength="200" />
              <span class="popup__error inputJob-error"></span>
            </label>
            <button class="popup__submit" type="submit">Сохранить</button>
          </form>
        </div>
      </div>

      {/* <!-- Popup Add New Place --> */}
      <div class="popup" id="newPlacePopup">
        <div class="popup__container">
          <form action="#" class="popup__form" name="newplace" novalidate>
            <button class="popup__close" type="button" aria-label="Закрыть окно"></button>
            <h2 class="popup__title">Новое место</h2>
            <label for="placeName" class="popup__field">
              <input type="text" class="popup__input" id="placeName" name="name" required autocomplete="off"
                placeholder="Название" minlength="2" maxlength="30" />
              <span class="popup__error placeName-error"></span>
            </label>
            <label for="placeLink" class="popup__field">
              <input type="url" class="popup__input" id="placeLink" name="link" required autocomplete="off"
                placeholder="Ссылка на картинку" />
              <span class="popup__error placeLink-error"></span>
            </label>
            <button class="popup__submit" type="submit">Создать</button>
          </form>
        </div>
      </div>

      {/* <!-- Popup View Place Image--> */}
      <div class="popup popup_type_big" id="viewImagePopup">
        <div class="popup__container popup__container_type_big">
            <button class="popup__close" type="button" aria-label="Закрыть окно"></button>
            <figure class="popup__figure">
              <img src="#" alt="" class="popup__image" />
              <figcaption class="popup__caption"></figcaption>
            </figure>
        </div>
      </div>

      {/* <!-- Popup Delete Own Card --> */}
      <div class="popup popup_type_small" id="deleteOwnCardPopup">
        <div class="popup__container popup__container_type_small">
          <form action="#" class="popup__form" name="deletecard" novalidate>
            <button class="popup__close" type="button" aria-label="Закрыть окно"></button>
            <h2 class="popup__title popup__title_type_delete">Вы уверены?</h2>
            <button class="popup__submit" type="submit">Да</button>
          </form>
        </div>
      </div>

      {/* <!-- Popup Edit Avatar --> */}
      <div class="popup" id="editAvatarPopup">
        <div class="popup__container">
          <form action="#" class="popup__form" name="avataredit" novalidate>
            <button class="popup__close" type="button" aria-label="Закрыть окно"></button>
            <h2 class="popup__title">Обновить аватар</h2>
            <label for="avatarLink" class="popup__field">
              <input type="url" class="popup__input" id="avatarLink" name="avatar" required autocomplete="off"
                placeholder="Ссылка на аватар" />
              <span class="popup__error avatarLink-error"></span>
            </label>
            <button class="popup__submit" type="submit">Сохранить</button>
          </form>
        </div>
      </div>

      {/* <!-- Шаблон своей карточки --> */}
      <template id="cardTemplate">
        <li class="card">
          <button class="card__delete" type="button" aria-label="Удалить карточку"></button>
          <img src="#" alt="" class="card__image" />
          <div class="card__description">
            <h2 class="card__title">#</h2>
            <div class="card__like-section">
              <button class="card__like" type="button" aria-label="Поставить лайк"></button>
              <span class="card__likes-count">6</span>
            </div>
          </div>
        </li>
      </template>

      {/* Шаблон чужой карточки */}
      <template id="foreignCardTemplate">
        <li class="card">
          <img src="#" alt="" class="card__image" />
          <div class="card__description">
            <h2 class="card__title">#</h2>
            <div class="card__like-section">
              <button class="card__like" type="button" aria-label="Поставить лайк"></button>
              <span class="card__likes-count">3</span>
            </div>
          </div>
        </li>
      </template>

    </div>
  );
}

export default App;
