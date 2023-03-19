function ImagePopup({card, onClose}) {

  const handleOnClick = (evt) => {
    const className = evt.target.className;
    if(className.includes('popup') || className.includes('popup__close')) {
      onClose();
    }
  }

  return (
    <div
      className={card ? "popup popup_type_big popup_opened" : "popup popup_type_big"} id="viewImagePopup"
      onClick={handleOnClick}
    >
      <div className="popup__container popup__container_type_big">
          <button
            className="popup__close"
            type="button"
            aria-label="Закрыть окно"
          />
          <figure className="popup__figure">
            <img src={card && card.link } alt={card && card.name} className="popup__image" />
            <figcaption className="popup__caption">{card && card.name}</figcaption>
          </figure>
      </div>
    </div>
  )
}

export default ImagePopup;
