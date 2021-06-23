import success from '../images/success.png'
// import fail from '../images/fail.png'

function InfoTooltip(props) {
  return (
    <div className="popup popup_type_auth">
      <div className="popup__container popup__container_auth">
        <img
          className="popup__auth-image"
          src={success}
          alt="Результат регистрации"
        />
        <h3 className="popup__title popup__title_auth">Вы успешно зарегистрировались!</h3>
        <button
          className="popup__button-close"
          type="button"
          aria-label="Закрыть"
        ></button>
      </div>
    </div>
  )
}

export default InfoTooltip