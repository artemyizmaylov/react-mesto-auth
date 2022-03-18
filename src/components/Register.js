import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register({ register }) {
  return (
    <AuthForm
      name="Регистрация"
      buttonText="Зарегистрироваться"
      onSubmit={register}
    >
      <Link to="/sign-in" className="link auth-page__link">
        Уже зарегистрированы? Войти
      </Link>
    </AuthForm>
  );
}

export default Register;
