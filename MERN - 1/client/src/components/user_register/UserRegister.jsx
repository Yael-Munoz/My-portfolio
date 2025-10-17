import styles from './UserRegister.module.css'
import { FaRegUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoLockClosedOutline } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';


function UserRegister() {

const serverPORT = 3000;
const serverURL = `http://localhost:${serverPORT}`;
const clientPORT = 5173;
const clientURL = `http://localhost:${clientPORT}`;
const navigate = useNavigate();

const [errors, setErrors] = useState('', '', '', '');
const [showPassword, setPassword] = useState(false);


    function setErrorAtIndex(index , message) {
      setErrors(prev => {
        const copy = [...prev];
        copy[index] = message;
        return copy;
      });


    }

    function handleSubmit(e) {
      setErrors('');
        e.preventDefault();

        const formData =
        {
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          username: e.target.username.value,
          password: e.target.password.value
        };
        const firstName = formData.firstName;
        const lastName = formData.lastName;
        const username = formData.username;
        const password = formData.password;

        

        if(!firstName || firstName.length > 20) {
          setErrorAtIndex(0, 'First name is required and cannot exceed 20 characters.');

        }
        if(!lastName || lastName.length > 20) {
          setErrorAtIndex(1, 'Last name is required and cannot exceed 20 characters.');
          
        }
        if(!username || username.length < 4 || username.length > 12) {
          setErrorAtIndex(2, 'Username must be between 4 and 12 characters.');

        }
        if(!password || password.length < 6 || password.length > 20) {
          setErrorAtIndex(3, 'Password must be between 6 and 20 characters.');
          return;
        }

        setErrors('');


        console.log(formData);

        fetch(serverURL + '/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
          .then(res => {
            if (!res.ok) {
              return res.json().then(data => {
                setErrors(data.errors || ['Registration failed']);
                throw new Error('Validation error');
              });
            }
            return res.json();
          })
          .then(data => {
            console.log('Server response: ', data);
            navigate('/login');
          })
          .catch(err => {
            console.log('Error: ' + err);
          });

          }

    return(<>
    
    <div className={styles.container}>
          <h2>Create an Account</h2>
    
        <form onSubmit={handleSubmit} className={styles['form']}>

          <p className={styles['user-info']}>First Name</p>
          <div className={styles['input-container']}>
            <FaRegUser className={styles.icon} />
            <input name='firstName' type='text' placeholder='Enter first name'/>
            </div>
            <p className={`${styles.error} ${errors[0] ? styles.visible : styles.hidden}`}>
              {errors[0]}
            </p>


            

          <p className={styles['user-info']}>Last Name</p>
          <div className={styles['input-container']}>
            <FaRegUser className={styles.icon} />
          <input name='lastName' type='text' placeholder='Enter last name'/>
            </div>
            <p className={`${styles.error} ${errors[1] ? styles.visible : styles.hidden}`}>
              {errors[1]}
            </p>

            

          <p className={styles['user-info']}>Username</p>
          <div className={styles['input-container']}>
            <MdDriveFileRenameOutline className={styles.icon} />
            <input name='username' type="text" placeholder=" Choose your username!" />
          </div>
          <p className={`${styles.error} ${errors[2] ? styles.visible : styles.hidden}`}>
            {errors[2]}
          </p>

          
    
          <p className={styles['user-info']}>Password</p>
          <div className={styles['input-container']}>
            <IoLockClosedOutline className={styles.icon} />
            <input name='password' type={showPassword ? 'text' : 'password'} placeholder=" Choose your password!" />
            {showPassword ? (<FaEye className={styles.eye} onClick={() => setPassword(false)}/>)
             : (<FaEyeSlash className={styles.eye} onClick={() => setPassword(true)}/>)}
          </div>
          <p className={`${styles.error} ${errors[3] ? styles.visible : styles.hidden}`}>
            {errors[3]}
          </p>

          
    
          <button className={styles['register-buttons']} type='submit'>CREATE ACCOUNT</button>
          </form>
    
          
        </div>
    
    
    </>
    );
}

export default UserRegister;