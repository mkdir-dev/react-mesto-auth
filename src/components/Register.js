function Register() {

  return (
    <div className="auth">
      <form
        className='auth__form'>
        <h2 className='auth__title'>Регистрация</h2>
        <input
          className="auth__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          minLength="2"
          required />
        <input
          className="auth__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          minLength="6"
          required />
        <button
          className="auth__button-submit"
          type="submit"
          aria-label="Зарегистрироваться">Зарегистрироваться</button>
      </form>
      <p className="auth__text">Уже зарегистрированы?&nbsp;
        <a className="auth__link" href="/sign-in">Войти</a>
      </p>
    </div>
  )
}

export default Register