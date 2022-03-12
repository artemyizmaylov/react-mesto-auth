import { useState, useEffect } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  return (
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
        onClick={(e) => {
          e.preventDefault();
          console.log('Sub');
        }}
        disabled={!formValid}
      >
        Войти
      </button>
    </div>
  );
}

export default Login;
