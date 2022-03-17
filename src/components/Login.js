import AuthForm from './AuthForm';

function Login({ login }) {
  return <AuthForm name="Войти" buttonText="Войти" onSubmit={login} />;
}

export default Login;
