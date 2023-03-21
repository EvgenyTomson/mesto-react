import { useEffect } from "react";

function PopupWithForm({isOpen, onClose, onSubmit, name, title, buttonText, isValid, children}) {

  const handleOnClick = (evt) => {
    const className = evt.target.className;
    if(className.includes('popup_opened') || className.includes('popup__close')) {
      onClose();
    }
  }

  useEffect(() => {
    const handleKeydown = (evt) => {
      (evt.key === 'Escape') && onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeydown);

      return () => {
        document.removeEventListener('keydown', handleKeydown);
      }
    }
  }, [isOpen, onClose]);

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
          <button className={isValid ? "popup__submit": "popup__submit popup__submit_disabled"} type="submit" disabled={!isValid}>{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
