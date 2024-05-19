import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginData } from '../api';
import { checkIfTokenIsValid } from '../helper';
import { jwtDecode } from "jwt-decode";

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

const Login = () => {
  const nav = useNavigate();

  useEffect(() => {
    if (checkIfTokenIsValid()) {
      nav('/');
    }
  }, [nav]);

  const { mutateAsync } = useMutation({
    mutationFn: loginData,
    onSuccess: (data) => {
      localStorage.setItem('token', data.idToken);
      const token = data.idToken;
      const decoded = jwtDecode(token);
      const user_id = decoded.user_id;
      localStorage.setItem('user_id', user_id);
      nav('/');
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        toast.error('Incorrect email or password');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    },
  });

  const onSubmit = async (data) => {
    await mutateAsync(data);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  });

  return (
    <div className="form-body">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="login-title">Login</h1>
        <div className="input-group">
          <input
            {...register('email')}
            type="email"
            placeholder="email@gmail.com"
            className="input-field"
          />
          {errors.email && (
            <div className="error-message">{errors.email.message}</div>
          )}
        </div>
        <div className="input-group">
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="input-field"
          />
          {errors.password && (
            <div className="error-message">{errors.password.message}</div>
          )}
        </div>
        <button type="submit" className="submit-btn">
          {isSubmitting ? 'Loading..' : 'Submit'}
        </button>
        <p>
          You don't have an account? <Link to="/register">Signup</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
