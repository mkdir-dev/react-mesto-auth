import { Link, useLocation } from 'react-router-dom'

function Header(props) {
  const location = useLocation()
  return (
    <header className="header">
      <Link className="header__logo"
        href="/"
        target="_blank"
        rel="noreferrer">
      </Link>
      <div className='header__auth'>
        {props.loggedIn ? (
          <>
            <p className='header__email'>{props.userEmail}</p>
            <Link
              className="header__signout"
              onClick={props.onSignOut}
              to="/sign-in">
              Выйти
            </Link>
          </>
        ) : (
          <Link
            className="header__signin"
            to={`${location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`}>
            {`${location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`}
          </Link>
        )

        }
      </div>
    </header>
  );
}

export default Header;