import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true); // Track email validity
  const [isPasswordValid, setIsPasswordValid] = useState(true); // Track password validity
  const [focusedInput, setFocusedInput] = useState(null); // Track which input is focused
  const navigate = useNavigate();

const handleSubmit = async (event) => {
  event.preventDefault();

  setError('');
  setIsEmailValid(true);
  setIsPasswordValid(true);

  try {
    const response = await fetch('http://localhost:5001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log(response)
    if (!response.ok) {
      throw new Error('Email or password is incorrect');
    }

    const data = await response.json();
    const token = data.token;  // Token returned from the server
    console.log('token: ', token)
    localStorage.setItem('authToken', token);  // Store token in localStorage

    alert('Login Successful!');
    navigate('/home');  // Redirect to home page
  } catch (error) {
    setError(error.message);
    setIsEmailValid(false);
    setIsPasswordValid(false);
  }
};


  // Handle focus event
  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  // Handle blur event
  const handleBlur = () => {
    setFocusedInput(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              className={`block text-sm font-medium text-gray-700 ${!isEmailValid ? 'text-red-500' : ''}`}
            >
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              required
              style={{
                borderColor: !isEmailValid
                  ? 'red'
                  : focusedInput === 'email'
                  ? 'blue'
                  : '',
                borderWidth: focusedInput === 'email' ? '2px' : '', // 2px border on focus
              }}
              className={`w-full px-4 py-2 mt-1 text-sm border rounded focus:outline-none   
                ${isEmailValid ? 'border-gray-300' : 'border-red-500'}`} // Apply red border if invalid
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              className={`block text-sm font-medium text-gray-700 ${!isPasswordValid ? 'text-red-500' : ''}`}
            >
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => handleFocus('password')}
              onBlur={handleBlur}
              required
              style={{
                borderColor: !isPasswordValid
                  ? 'red'
                  : focusedInput === 'password'
                  ? 'blue'
                  : '',
                borderWidth: focusedInput === 'password' ? '2px' : '', // 2px border on focus
              }}
              className={`w-full px-4 py-2 mt-1 text-sm border rounded focus:outline-none   
                ${isPasswordValid ? 'border-gray-300' : 'border-red-500'}`} // Apply red border if invalid
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Login
          </button>

          {/* Error Message */}
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </form>

        {/* Sign Up Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-blue-500 hover:text-blue-700"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


