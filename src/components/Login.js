import React from 'react'

function Login(props) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onLogin(email, password)
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
        <h2 className='auth__title'>Вход</h2>
        <input
          className="auth__input"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          minLength="2"
          required
          onChange={handleChangeEmail}
          value={email}
        />
        <input
          className="auth__input"
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          minLength="6"
          required
          onChange={handleChangePassword}
          value={password}
        />
        <button
          className="auth__button-submit"
          type="submit"
          aria-label="Войти">Войти</button>
      </form>
    </div>
  )

}

export default Login