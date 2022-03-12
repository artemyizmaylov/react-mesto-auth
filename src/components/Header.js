import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип" src={logo} />
      <Link to="/sign-in" className="link">
        Войти
      </Link>
    </header>
  );
}

export default Header;
