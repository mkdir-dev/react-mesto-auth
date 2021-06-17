function ImagePopup(props) {
  return (
    <div className={props.card ? "popup popup_type_view popup_opened" : "popup popup_type_view"}>
      <div className="popup__view">
        <figure className="popup__figure">
          <img className="popup__image" src={props.card ? props.card.link : ""} alt={props.card ? props.card.name : ""} />
          <figcaption className="popup__figcaption">{props.card ? props.card.name : ""}</figcaption>
        </figure>
        <button className="popup__button-close" type="button" aria-label="Закрыть" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;