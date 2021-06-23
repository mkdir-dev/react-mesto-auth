import React from 'react'
import { Link } from 'react-router-dom'

function Register(props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onRegister(email, password)
  }

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  return (
    <div className="auth">
      <form
        className='auth__form'
        onSubmit={handleSubmit}
      >
        <h2 className='auth__title'>Регистрация</h2>
        <input
          className="auth__input"
          id="reg-email"
          name="email"
          type="email"
          placeholder="Email"
          minLength="2"
          required
          onInput={handleChangeEmail}
        />
        <input
          className="auth__input"
          id="reg-password"
          name="password"
          type="password"
          placeholder="Пароль"
          minLength="6"
          required
          onInput={handleChangePassword}
        />
        <button
          className="auth__button-submit"
          type="submit"
          aria-label="Зарегистрироваться">Зарегистрироваться</button>
      </form>
      <p className="auth__text">Уже зарегистрированы?&nbsp;
        <Link className="auth__link" to="/sign-in">Войти</Link>
      </p>
    </div>
  )
}

export default Register