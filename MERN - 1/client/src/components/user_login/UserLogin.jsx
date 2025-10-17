import styles from './UserLogin.module.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

function UserLogin() {
  const serverURL = `http://localhost:3000`;
  const navigate = useNavigate();

  const [showPassword, setPassword] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    fetch(serverURL + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          console.log('Login failed: ', data);
          return;
        } else {
          console.log('Login successful: ', data);
          navigate('/home');
        }
      })
      .catch((error) => {
        console.log('Unsuccessful Login: ', error);
      });
  }

  return (
    <div className={styles['user-login-container']}>
      <h2 className={styles['user-login-title']}>Login</h2>

      <form onSubmit={handleSubmit} className={styles['user-login-form']}>
        <p className={styles['user-login-label']}>Username</p>
        <div className={styles['user-login-input-container']}>
          <FaUser className={styles['user-login-icon']} />
          <input ref={usernameRef} type="text" placeholder=" Type your username" />
        </div>

        <p className={styles['user-login-label']}>Password</p>
        <div className={styles['user-login-input-container']}>
          <FaLock className={styles['user-login-icon']} />
          <input
            ref={passwordRef}
            type={showPassword ? 'text' : 'password'}
            placeholder=" Type your password"
          />
          {showPassword ? (
            <FaEye className={styles['user-login-eye']} onClick={() => setPassword(false)} />
          ) : (
            <FaEyeSlash className={styles['user-login-eye']} onClick={() => setPassword(true)} />
          )}
        </div>

        <button className={styles['user-login-button']} type="submit">
          SIGN IN
        </button>
      </form>

      <div>
        <p className={styles['user-login-new-account']}>
          Don't have an account? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default UserLogin;
