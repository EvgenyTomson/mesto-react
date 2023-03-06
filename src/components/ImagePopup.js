function ImagePopup() {
  return (
    <div className="popup popup_type_big" id="viewImagePopup">
      <div className="popup__container popup__container_type_big">
          <button className="popup__close" type="button" aria-label="Закрыть окно"></button>
          <figure className="popup__figure">
            <img src="#" alt="" className="popup__image" />
            <figcaption className="popup__caption"></figcaption>
          </figure>
      </div>
    </div>
  )
}

export default ImagePopup;
