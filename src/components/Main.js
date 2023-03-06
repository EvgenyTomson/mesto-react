import { useEffect, useState } from 'react';
import tempAvatar from '../img/avatar.png';
import { api } from '../utils/api';
import Card from './Card';

function Main(props) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(responses => {
        const [userData, initialCardsData] = responses;

        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);

        setCards(initialCardsData);
      })
      .catch(err => console.log(err));
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
              onClick={props.onEditAvatar}>
              <img src={userAvatar ? userAvatar : tempAvatar} alt=" Аватар пользователя." className="profile__avatar" />
            </button>
          </div>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{userName}</h1>
              <button
                className="profile__edit"
                type="button"
                aria-label="Редактировать профиль"
                onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__about">{userDescription}</p>
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
          {cards.map(card => <Card card={card}  key={card._id} onCardClick={props.onCardClick} />)}
        </ul>
      </section>
    </main>
  )
}

export default Main;
