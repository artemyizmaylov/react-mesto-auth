import { useState, useEffect } from 'react';

function AuthForm({ name, buttonText, onSubmit, children }) {
  const [values, setValues] = useState({
    email: {
      value: '',
      message: '',
      isValid: false,
    },
    password: {
      value: '',
      message: '',
      isValid: false,
    },
  });
  const [formValid, setFormValid] = useState(false);

  const handleChange = (event) => {
    const { name, value, validationMessage, validity } = event.target;
    setValues((values) => ({
      ...values,
      [name]: {
        value,
        message: validationMessage,
        isValid: validity.valid,
      },
    }));
  };

  useEffect(() => {
    if (values.email.isValid && values.password.isValid) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [values]);

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      password: values.password.value,
      email: values.email.value,
    };

    onSubmit(data);
  }

  return (
    <div className="auth-page">
      <form className="form">
        <h2 className="auth-page__heading">{name}</h2>
        <label className="form__input-label" htmlFor="email">
          <input
            value={values.email.value}
            onChange={handleChange}
            className="form__input form__input_theme_dark"
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            minLength={4}
            required
          />
          <span className="form__input-error">{values.email.message}</span>
        </label>
        <label className="form__input-label" htmlFor="password">
          <input
            value={values.password.value}
            onChange={handleChange}
            className="form__input form__input_theme_dark"
            name="password"
            id="password"
            type="password"
            placeholder="Пароль"
            minLength={4}
            required
          />
          <span className="form__input-error">{values.password.message}</span>
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
          {buttonText}
        </button>
        {children}
      </div>
    </div>
  );
}

export default AuthForm;
