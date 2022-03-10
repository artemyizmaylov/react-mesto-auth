import Header from './Header';

function Register() {
  return (
    <>
      <h2 className="popup__heading">Регистрация</h2>
      <form className="form">
        <label className="form__input-label" htmlFor="email">
          <input
            className="form__input"
            name="email"
            id="email"
            type="email"
            placeholder="Email"
          />
          <span className="form__input-error"></span>
        </label>
        <label className="form__input-label" htmlFor="password">
          <input
            className="form__input"
            name="password"
            id="password"
            type="password"
            placeholder="Пароль"
          />
          <span className="form__input-error"></span>
        </label>
        <button
          className="button submit-button"
          type="Submit"
          onClick={(e) => {
            e.preventDefault();
            console.log('Sub');
          }}
        >
          Зарегистрироваться
        </button>
      </form>
    </>
  );
}

export default Register;
