import { useState } from 'react';
import './Styles/Login.css'
import { Link } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <article className="container">
      <h3>{isLogin ? 'Login' : 'Register'}</h3>
      <p>{isLogin
          ? 'Enter your email below to login to your account.'
          : 'Create your account by entering your email and password.'}
      </p>

      <form>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />

        <label for="password">Password {isLogin && <Link to='/recovery-pass'><span>Forgot your password?</span></Link>}</label>
        <input type="password" id="password" name="password" required />

      </form>

      <button className='btn-form' type="submit">{isLogin ? 'Login' : 'Register'}</button>
      
      <div className='viewer'>
        <p>{isLogin ? "Don't have an account?" : 'Already have an account?'}</p>
        <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign Up' : 'Login'}</span>
      </div>
    </article>
  );
}