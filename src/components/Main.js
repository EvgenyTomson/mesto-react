import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
// import tempAvatar from '../img/avatar.png';
import { api } from '../utils/api';
import Card from './Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

  const currentUser = useContext(CurrentUserContext);
  const [cards, setCards] = useState([]);

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

  useEffect(() => {
    api.getInitialCards()
      .then(initialCardsData => {
        setCards(initialCardsData);
      })
      .catch(err => console.error(err));
  },[]);

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
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;
