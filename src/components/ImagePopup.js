function ImagePopup(props) {
  return (
    <div className={props.card ? "popup popup_type_big popup_opened" : "popup popup_type_big"} id="viewImagePopup">
      <div className="popup__container popup__container_type_big">
          <button
            className="popup__close"
            type="button"
            aria-label="Закрыть окно"
            onClick={props.onClose}
          ></button>
          <figure className="popup__figure">
            <img src={props.card && props.card.link } alt={props.card && props.card.name} className="popup__image" />
            <figcaption className="popup__caption">{props.card && props.card.name}</figcaption>
          </figure>
      </div>
    </div>
  )
}

export default ImagePopup;
