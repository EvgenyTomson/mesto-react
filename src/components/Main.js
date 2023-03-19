import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
// import tempAvatar from '../img/avatar.png';
// import { api } from '../utils/api';
import Card from './Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

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
              onClick={onEditAvatar}>
              <img
                // src={currentUser ? currentUser.avatar : tempAvatar}
                src={currentUser.avatar}
                alt=" Аватар пользователя."
                className="profile__avatar" />
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{currentUser ? currentUser.name: ''}</h1>
              <button
                className="profile__edit"
                type="button"
                aria-label="Редактировать профиль"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__about">{currentUser ? currentUser.about: ''}</p>
          </div>
        </div>
        <button
          className="profile__add-place"
          type="button"
          aria-label="Добавить место"
          onClick={onAddPlace}
        />
      </section>
      {/* <!-- Elements --> */}
      <section className="elements">
        <ul className="elements__cards">
          {cards.map(card => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              // onCardLike={handleCardLike}
              onCardLike={onCardLike}
              // onCardDelete={handleCardDelete}
              onCardDelete={onCardDelete}
              />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;
