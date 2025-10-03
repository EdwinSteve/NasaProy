import { useContext, useState } from 'react';
import './Styles/Login.css'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginUser, registerUser } from '../Services/auth';
import { requestRecoveryCode } from '../Services/recovery';
import AuthContext from '../Context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
    reset
  } = useForm();
  const { setIsAuthenticated } = useContext(AuthContext);

  const onSubmit = async (data) => {
    if (isLogin) {
      await loginUser(data.email, data.password);
      await setIsAuthenticated(true);
      navigate('/');
    } else {
      await registerUser(data.email, data.password);
      setIsLogin(!isLogin);
      reset();
    }
  };

  const onChangeView = () => {
    setIsLogin(!isLogin);
    reset();
  }

  const onRecoveryPassword = async () => {
    const isValid = await trigger('email');
    const email = getValues('email');
    if (!isValid) return; 
    await requestRecoveryCode(email);
    navigate('/recovery-pass', { state: { email }});
  }

  return (
    <article className="container">
      <h3>{isLogin ? 'Login' : 'Register'}</h3>
      <p>{isLogin
          ? 'Enter your email below to login to your account.'
          : 'Create your account by entering your email and password.'}
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          {...register('email', { required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
              message: 'Enter a valid email address'
            }
          })} 
        />
        {errors.email && <span className="error">{errors.email.message}</span>}

        <label htmlFor="password">Password {isLogin &&
          <span onClick={() => onRecoveryPassword()}>Forgot your password?</span>
        }</label>
        <input 
          type="password" 
          id="password"
          {...register('password', {required: 'Password is required', minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }})}
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
        <button className='btn-form' type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      
      <div className='viewer'>
        <p>{isLogin ? "Don't have an account?" : 'Already have an account?'}</p>
        <span onClick={() => onChangeView()}>{isLogin ? 'Sign Up' : 'Login'}</span>
      </div>
    </article>
  );
}