import { useState, useEffect } from 'react';
import { login } from '../utils/Auth';
import { useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';

function Login(props) {
  const { isPopupOpen, closePopup, openPopup, setLoggedIn } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successLogin, setSuccessLogin] = useState(false);

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [passValidationMessage, setPassValidationMessage] = useState('');
  const [formValid, setFormValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (emailValid && passwordValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [emailValid, passwordValid]);

  function handleChange(e) {
    switch (e.target.name) {
      case 'email':
        setEmail(e.target.value);
        setEmailValidationMessage(e.target.validationMessage);
        setEmailValid(e.target.validity.valid);
        break;
      case 'password':
        setPassword(e.target.value);
        setPassValidationMessage(e.target.validationMessage);
        setPasswordValid(e.target.validity.valid);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      password,
      email,
    };

    login(data)
      .then((res) => {
        if (res !== undefined) {
          setLoggedIn(true);
          navigate('/');
        } else {
          setSuccessLogin(false);
          openPopup(true);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="auth-page">
        <form className="form">
          <h2 className="auth-page__heading">Войти</h2>
          <label className="form__input-label" htmlFor="email">
            <input
              value={email}
              onChange={handleChange}
              className="form__input form__input_theme_dark"
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
            <span className="form__input-error">{emailValidationMessage}</span>
          </label>
          <label className="form__input-label" htmlFor="password">
            <input
              value={password}
              onChange={handleChange}
              className="form__input form__input_theme_dark"
              name="password"
              id="password"
              type="password"
              placeholder="Пароль"
              required
            />
            <span className="form__input-error">{passValidationMessage}</span>
          </label>
        </form>

        <button
          className={`button form__submit-button form__submit-button_theme_dark ${
            formValid ? '' : 'form__submit-button_disabled'
          }`}
          type="Submit"
          onClick={handleSubmit}
          disabled={!formValid}
        >
          Войти
        </button>
      </div>

      <InfoTooltip
        isOpen={isPopupOpen}
        onClose={closePopup}
        successRegistration={successLogin}
      />
    </>
  );
}

export default Login;
