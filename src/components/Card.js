function Card(props) {

  const handleClick = () => {
    props.onCardClick(props.card);
  }

  return (
    <li className="card">
      <button className="card__delete" type="button" aria-label="Удалить карточку"></button>
      <img
        src={props.card.link}
        alt={props.card.name}
        className="card__image"
        onClick={handleClick}
       />
      <div className="card__description">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-section">
          <button className="card__like" type="button" aria-label="Поставить лайк"></button>
          <span className="card__likes-count">{props.card.likes.length}</span>
        </div>
      </div>
    </li>
  )
};

export default Card;
