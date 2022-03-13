import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { register } from '../utils/Auth';
import InfoTooltip from './InfoTooltip';

function Register(props) {
  const { isPopupOpen, closePopup, openPopup } = props;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successRegistration, setSuccessRegistration] = useState(false);

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = useState('');
  const [passValidationMessage, setPassValidationMessage] = useState('');
  const [formValid, setFormValid] = useState(false);

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

    register(data)
      .then((res) => {
        if (res) {
          setSuccessRegistration(true);
          openPopup(true);
        } else {
          setSuccessRegistration(false);
          openPopup(true);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="auth-page">
        <form className="form">
          <h2 className="auth-page__heading">Регистрация</h2>
          <label className="form__input-label" htmlFor="email">
            <input
              value={email}
              onChange={handleChange}
              className="form__input form__input_theme_dark"
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              minLength={4}
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
              minLength={4}
              required
            />
            <span className="form__input-error">{passValidationMessage}</span>
          </label>
        </form>

        <div className="buttons-container">
          <button
            className={`button form__submit-button form__submit-button_theme_dark ${
              formValid ? '' : 'form__submit-button_disabled'
            }`}
            type="Submit"
            onClick={handleSubmit}
            disabled={!formValid}
          >
            Зарегистрироваться
          </button>
          <Link to="/sign-in" className="link">
            Уже зарегистрированы? Войти
          </Link>
        </div>
      </div>

      <InfoTooltip
        isOpen={isPopupOpen}
        onClose={closePopup}
        successRegistration={successRegistration}
      />
    </>
  );
}

export default Register;
