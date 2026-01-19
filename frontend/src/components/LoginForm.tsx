import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

export const LoginForm = () => {
  const [isLogged, setIsLogged] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const containerStyle = useMemo(() => ({
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '350px',
    backgroundColor: '#fff',
    fontFamily: 'sans-serif'
  }), []);

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    setIsLogged(true);
  };

  if (isLogged) return <div style={containerStyle}>✅ Access Granted!</div>;

  return (
    <div style={containerStyle}>
      <h2 style={{ marginTop: 0 }}>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <input 
            {...register('login', { required: 'Login is required' })} 
            placeholder="Login"
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
          {errors.login && <p style={{ color: 'red', fontSize: '12px' }}>{String(errors.login.message)}</p>}
        </div>
        
        <div>
          <input 
            type="password"
            {...register('password', { required: 'Password is required', minLength: 4 })} 
            placeholder="Password"
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
          />
          {errors.password && <p style={{ color: 'red', fontSize: '12px' }}>Min 4 characters needed</p>}
        </div>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>
    </div>
  );
};