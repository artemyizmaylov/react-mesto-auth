import logo from '../images/logo.svg';
import { Link, useLocation, Route, Routes } from 'react-router-dom';

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
        <Routes>
          <Route
            path="/"
            element={
              <Link
                to="/sign-in"
                className="link"
                style={grayColor}
                onClick={exit}
              >
                Выйти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="link">
                Войти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
