function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form className={`popup__form popup__form_type_${props.name}`} onSubmit={props.onSubmit} name={props.name} noValidate>
          {props.children}
          <button className="popup__button-save" type="submit" aria-label={props.buttonText}>{props.buttonText}</button>
        </form>
        <button className="popup__button-close" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default PopupWithForm