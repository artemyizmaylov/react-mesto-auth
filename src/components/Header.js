import logo from '../images/logo.svg';
import { Link, Route, Routes } from 'react-router-dom';

function Header({ email, exit }) {
  return (
    <header className="header">
      <img className="header__logo" alt="Логотип" src={logo} />
      <div className="header__links">
        <p className="header__user-email">{email}</p>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Link
                to="/sign-in"
                className="link link_color_gray"
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
