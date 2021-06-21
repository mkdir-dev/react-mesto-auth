function Login() {

  return (
    <div className="auth">
      <form
        className='auth__form'>
        <h2 className='auth__title'>Вход</h2>
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
          aria-label="Войти">Войти</button>
      </form>
    </div>
  )

}

export default Login