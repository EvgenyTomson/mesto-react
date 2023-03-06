function Card({card, onCardClick}) {

  const handleClick = () => {
    onCardClick(card);
  }

  return (
    <li className="card">
      <button className="card__delete" type="button" aria-label="Удалить карточку" />
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleClick}
      />
      <div className="card__description">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-section">
          <button className="card__like" type="button" aria-label="Поставить лайк" />
          <span className="card__likes-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
};

export default Card;
