import styles from "./login.module.css";
import { useState } from 'react'

function Login() {

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleClick = async function() {
        fetch("http://localhost:5000/api/login", {
            method : "POST",
            headers : { "Content-Type" : "application/json" },
            body : JSON.stringify ({
                usernameOrEmail : usernameOrEmail,
                password : password
            })
        })
    }


    return(
        <>
            <div className="flex">
                <div className={styles.container}>
                    <h2> This is where the login box will be </h2>
                    <form onclick={handleClick}>
                        <div className={styles['input-box']}>
                            <label htmlFor="username">Username or Email: </label>
                            <input type="text" name="username" 
                            id="username"
                            onChange={function(event) {
                                setUsernameOrEmail(event.target.value);
                            }}
                            /> 
                        </div>

                        <div className={styles['input-box']}>
                            <label htmlFor="password">Password: </label>
                            <input type="text"name="password"id="password"
                            onChange={function(event) {
                                setPassword(event.target.value);
                            }}

                            />
                        </div>
                        
                        <div>
                            <button type='submit'>Button</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
