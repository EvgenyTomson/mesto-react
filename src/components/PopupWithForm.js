function PopupWithForm({isOpen, onClose, name, title, buttonText, children}) {
  return (
    <div className={isOpen ? "popup popup_opened" : "popup"} id={name}>
      <div className="popup__container">
        <form action="#" className="popup__form" name={name} noValidate>
          <button
            className="popup__close"
            type="button"
            aria-label="Закрыть окно редактирования"
            onClick={onClose}
          />
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className="popup__submit" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
