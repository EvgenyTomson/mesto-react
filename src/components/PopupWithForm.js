function PopupWithForm(props) {
  return (
    <div className={props.isOpen ? "popup popup_opened" : "popup"} id={props.name}>
      <div className="popup__container">
        <form action="#" className="popup__form" name={props.name} noValidate>
          <button
            className="popup__close"
            type="button"
            aria-label="Закрыть окно редактирования"
            onClick={props.onClose}></button>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__submit" type="submit">Сохранить</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
