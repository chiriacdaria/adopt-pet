import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './index.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [focusedInput, setFocusedInput] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const navigate = useNavigate(); // Create the navigate function

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if password and confirm password match before submitting
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      if (!response.ok) {
        throw new Error('Sign-up failed');
      }

      alert('Sign-up successful!');
      // Redirect to the home page after successful sign-up
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (emailRegex.test(newEmail)) {
      setIsEmailValid(true);
      setError('');
    } else {
      setIsEmailValid(false);
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);

    if (password !== newConfirmPassword) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
      setError('');
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (newPassword === confirmPassword) {
      setIsPasswordMatch(true);
      setError('');
    } else {
      setIsPasswordMatch(false);
    }
  };

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ color: !isEmailValid ? 'red' : '' }}
            >
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              required
              style={{
                borderColor: !isEmailValid
                  ? 'red'
                  : focusedInput === 'email'
                  ? 'blue'
                  : '',
                borderWidth: focusedInput === 'email' ? '2px' : '',
              }}
              className="w-full px-4 py-2 mt-1 text-sm border rounded focus:outline-none"
            />
            {!isEmailValid && (
              <p className="mt-2 text-sm text-red-500">Please enter a valid email address</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ color: !isPasswordMatch ? 'red' : '' }}
            >
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onFocus={() => handleFocus('password')}
              onBlur={handleBlur}
              required
              style={{
                borderColor: !isPasswordMatch
                  ? 'red'
                  : focusedInput === 'password'
                  ? 'blue'
                  : '',
                borderWidth: !isPasswordMatch
                  ? (focusedInput === 'password' ? '2px' : '')
                  : (focusedInput === 'password' ? '2px' : ''),
              }}
              className="w-full px-4 py-2 mt-1 text-sm border rounded focus:outline-none"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              style={{ color: !isPasswordMatch ? 'red' : '' }}
            >
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onFocus={() => handleFocus('confirmPassword')}
              onBlur={handleBlur}
              required
              style={{
                borderColor: !isPasswordMatch
                  ? 'red'
                  : focusedInput === 'confirmPassword'
                  ? 'blue'
                  : '',
                borderWidth: !isPasswordMatch
                  ? (focusedInput === 'confirmPassword' ? '2px' : '')
                  : (focusedInput === 'confirmPassword' ? '2px' : ''),
              }}
              className="w-full px-4 py-2 mt-1 text-sm border rounded focus:outline-none"
            />
            {!isPasswordMatch && (
              <p className="mt-2 text-sm text-red-500">Passwords do not match</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
            disabled={!isPasswordMatch || !isEmailValid}
          >
            Sign Up
          </button>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-blue-500 hover:text-blue-700">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
