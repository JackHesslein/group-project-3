import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import { useMutation } from '@apollo/client';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  const [login] = useMutation(LOGIN);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: {email, password} });
      console.log(data);
      const { token } = data.login;
      //console.log('Login response:', response); // Log the response
      localStorage.setItem('token', token);
      history('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid username or password. Please try again.');
    }
  };
  return (
    <div className="login pt-5 text-center">
      <h1 className='loginh1'>Login</h1>
      <form className="login-form pt-5 text-center" onSubmit={handleLogin}>
        <div className='d-flex flex-column text-center justify-content-center align-items-center'>
          <label htmlFor="username">Email:</label>
          <input
            className='rounded-3 text-center'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='pt-4 d-flex flex-column text-center justify-content-center align-items-center'>
          <label htmlFor="password pt-3">Password:</label>
          <input
            className='rounded-3 text-center'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='pt-4 text-center'>
          <button type="submit">Login</button>
        </div>
      </form>
      <p className='pt-2'>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};
export default Login;