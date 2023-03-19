function PopupWithForm({isOpen, onClose, onSubmit, name, title, buttonText, children}) {

  const handleOnClick = (evt) => {
    const className = evt.target.className;
    if(className.includes('popup') || className.includes('popup__close')) {
      onClose();
    }
  }

  return (
    <div
      className={isOpen ? "popup popup_opened" : "popup"} id={name}
      onClick={handleOnClick}
    >
      <div className="popup__container">
        <form action="#" className="popup__form" name={name} noValidate onSubmit={onSubmit} >
          <button
            className="popup__close"
            type="button"
            aria-label="Закрыть окно редактирования"
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
