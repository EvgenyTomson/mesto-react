import tempAvatar from '../img/avatar.png';

function Main(props) {

  // const handleEditAvatarClick = () => {
  //   document.querySelector('#editAvatarPopup').classList.add('popup_opened');
  // }

  // const handleEditProfileClick = () => {
  //   document.querySelector('#profileEditPopup').classList.add('popup_opened');
  // }

  // const handleAddPlaceClick = () => {
  //   document.querySelector('#newPlacePopup').classList.add('popup_opened');
  // }

  return (
    <main className="content">
      {/* <!-- Profile --> */}
      <section className="profile">
        <div className="profile__current">
          <div className="profile__avatar-outer">
            <button
              className="profile__avatar-button"
              type="button"
              aria-label="Изменить аватар"
              onClick={props.onEditAvatar}>
              <img src={tempAvatar} alt=" Аватар пользователя." className="profile__avatar" />
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">Жак-Ив Кусто</h1>
              <button
                className="profile__edit"
                type="button"
                aria-label="Редактировать профиль"
                onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__about">Исследователь океана</p>
          </div>
        </div>
        <button
          className="profile__add-place"
          type="button"
          aria-label="Добавить место"
          onClick={props.onAddPlace}></button>
      </section>
      {/* <!-- Elements --> */}
      <section className="elements">
        <ul className="elements__cards">
        </ul>
      </section>
    </main>
  )
}

export default Main;
