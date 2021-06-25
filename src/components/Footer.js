import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <Link
        to="https://github.com/mkdir-dev"
        className="footer__copyright"
        target="_blank"
        rel="noreferrer">
        &copy; Проект "Место". 2021. Михаил Корюков
      </Link>
    </footer>
  );
}

export default Footer;