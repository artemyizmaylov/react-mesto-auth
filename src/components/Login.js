function Login() {
  return (
    <div className="auth-page-container">
      <h2 className="popup__heading popup__heading_theme_dark">Вход</h2>
      <form className="form">
        <label className="form__input-label" htmlFor="email">
          <input
            className="form__input form__input_theme_dark"
            name="email"
            id="email"
            type="email"
            placeholder="Email"
          />
          <span className="form__input-error"></span>
        </label>
        <label className="form__input-label" htmlFor="password">
          <input
            className="form__input form__input_theme_dark"
            name="password"
            id="password"
            type="password"
            placeholder="Пароль"
          />
          <span className="form__input-error"></span>
        </label>

        <button
          className="button form__submit-button form__submit-button_theme_dark"
          type="Submit"
          onClick={(e) => {
            e.preventDefault();
            console.log('Sub');
          }}
        >
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
