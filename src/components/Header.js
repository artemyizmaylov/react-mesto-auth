import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ email, loggedIn, exit }) {
  const grayColor = {
    color: 'rgba(169, 169, 169, 1)',
  };
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" alt="Логотип" src={logo} />
      <div className="header__links">
        <p className="header__user-email">{email}</p>
        <Link
          to={location.pathname === '/sign-in' ? '/sign-up' : 'sign-in'}
          className="link"
          style={loggedIn ? grayColor : {}}
          onClick={exit}
        >
          {loggedIn
            ? 'Выйти'
            : location.pathname === '/sign-in'
            ? 'Регистрация'
            : 'Войти'}
        </Link>
      </div>
    </header>
  );
}

export default Header;
