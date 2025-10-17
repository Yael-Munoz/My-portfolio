import { useState, useRef, useEffect } from 'react';
import styles from './UserHome.module.css';
import { useNavigate } from 'react-router-dom';

function UserHome() {
  const serverURL = 'http://localhost:3000';
  const navigate = useNavigate();
  const [showUpdateMenu, setShowUpdateMenu] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const oldUsernameRef = useRef();
  const oldPasswordRef = useRef();

  async function fetchWithAuth(url, options) {
    let res = await fetch(url, { ...options, credentials: 'include' });
    if (res.status === 401 || res.status === 403) {
      const refreshRes = await fetch(`${serverURL}/refresh`, {
        method: 'POST',
        credentials: 'include'
      });
      if (!refreshRes.ok) {
        navigate('/login');
        return res;
      }
      res = await fetch(url, { ...options, credentials: 'include' });
    }
    return res;
  }

  useEffect(() => {
    fetchWithAuth(`${serverURL}/home`, { method: 'GET' })
      .then(res => {
        if (!res.ok) {
          navigate('/login');
        }
      })
      .catch(() => {
        navigate('/login');
      });
  }, []);

  async function handleUpdate(e) {
    e.preventDefault();
    const userData = {
      oldUsername: oldUsernameRef.current.value,
      oldPassword: oldPasswordRef.current.value,
      newFirstName: firstNameRef.current.value,
      newLastName: lastNameRef.current.value,
      newUsername: usernameRef.current.value,
      newPassword: passwordRef.current.value
    };
    const res = await fetchWithAuth(`${serverURL}/home`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (res.ok) {
      setShowUpdate(true);
      setTimeout(() => setShowUpdate(false), 5000);
    } else {
      navigate('/login');
    }
  }

  async function handleSignOut() {
    await fetchWithAuth(`${serverURL}/home`, { method: 'POST', headers: { 'Content-Type': 'application/json' }});
    navigate('/login');
  }

  async function handleDelete(e) {
    e.preventDefault();
    const userData = { username: usernameRef.current.value, password: passwordRef.current.value };
    const res = await fetchWithAuth(`${serverURL}/home`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (res.ok) {
      navigate('/login');
    } else {
      navigate('/login');
    }
  }

  return (
    <>
      <div className={styles['user-home-tools-container']}>
        <div className={styles['user-home-account-tools-text-container']}>
          <h1 className={styles['user-home-h1-account-tools']}>ACCOUNT TOOLS</h1>
        </div>
        <div className={styles['user-home-buttons-container']}>
          <button className={styles['user-home-update-button']} onClick={() => { setShowUpdateMenu(true); setShowDeleteMenu(false); }}>UPDATE ACCOUNT</button>
          <button className={styles['user-home-sign-out-button']} onClick={handleSignOut}>SIGN OUT</button>
          <button className={styles['user-home-delete-button']} onClick={() => { setShowDeleteMenu(true); setShowUpdateMenu(false); }}>DELETE ACCOUNT</button>
        </div>
      </div>

      {showUpdateMenu && (
        <div className={styles['user-home-menu']}>
          <input ref={oldUsernameRef} className={styles['user-home-input']} placeholder="Enter your current username" />
          <input ref={oldPasswordRef} className={styles['user-home-input']} placeholder="Enter your current password" />
          <span className={styles['user-home-menu-instruction']}>Enter the data you wish to update to (must fill the form)</span>
          <input ref={firstNameRef} className={styles['user-home-input']} placeholder="Enter first name" />
          <input ref={lastNameRef} className={styles['user-home-input']} placeholder="Enter last name" />
          <input ref={usernameRef} className={styles['user-home-input']} placeholder="Enter username" />
          <input ref={passwordRef} className={styles['user-home-input']} placeholder="Enter password" />
          <div className={styles['user-home-delete-buttons-container']}>
            <button className={styles['user-home-delete-cancel-button']} onClick={() => setShowUpdateMenu(false)}>Cancel</button>
            <button className={styles['user-home-delete-confirm-button']} onClick={(e) => { handleUpdate(e); setShowUpdateMenu(false); }}>Confirm</button>
          </div>
        </div>
      )}

      {showUpdate && (
        <div className={styles['user-home-show-update-container']}>
          <div className={styles['user-home-show-update-text']}>Account was updated!</div>
        </div>
      )}

      {showDeleteMenu && (
        <div className={styles['user-home-menu']}>
          <span className={styles['user-home-menu-instruction']}>Enter the username and password of the account you wish to delete</span>
          <input ref={usernameRef} className={styles['user-home-input']} placeholder="Enter username" />
          <input ref={passwordRef} className={styles['user-home-input']} placeholder="Enter password" />
          <div className={styles['user-home-delete-buttons-container']}>
            <button className={styles['user-home-delete-cancel-button']} onClick={() => setShowDeleteMenu(false)}>Cancel</button>
            <button className={styles['user-home-delete-confirm-button']} onClick={handleDelete}>Confirm</button>
          </div>
        </div>
      )}
    </>
  );
}

export default UserHome;