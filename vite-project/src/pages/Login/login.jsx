import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import styles from "./login.module.css";

    function Login() {

        const [existingJWTUsernameOrEmail, setExistingJWTUsernameOrEmail] = useState('');
        const [existingJWTPassword, setExistingJWTPassword] = useState('');

        const [usernameOrEmail, setUsernameOrEmail] = useState('');
        const [password, setPassword] = useState('');
        const [messageOne, setMessageOne] = useState('');
        const [messageTwo, setMessageTwo] = useState('');
        const [jsonWebToken, setJsonWebToken] = useState('');

        const navigate = useNavigate();

        const handleClick = async function(event) {
            event.preventDefault();

            fetch("http://localhost:3000/api/login", {
                method : "POST",
                headers : { "Content-Type" : "application/json" },
                body : JSON.stringify ({
                    usernameOrEmail : existingJWTUsernameOrEmail, // existing and current username/email
                    password : existingJWTPassword // existing and current password
                })
            })
            .then(function converResponsetoJSON(response) {
                return response.json();
            })
            .then(function handleResponse(response) {
                setMessageOne(response.messageFive);
                setJsonWebToken(response.token)
            })
            .catch(function catchError(error) {
                console.log(error);
            })
        }

        useEffect(function() {
            if (messageOne === 'Login Successful') {
                // setMessageTwo("Routing you to Home Page in 3..2..1");
                setTimeout(function() {
                    navigate('/home');
                }, 0);
                if (! (localStorage.getItem("authToken") )) {
                    localStorage.setItem("authToken", jsonWebToken);
                }
                localStorage.setItem("isLogged", "true")
            }
        },[messageOne]);

        useEffect(function() {
            let token = localStorage.getItem("authToken");

            if (token) {
                
                fetch("http://localhost:3000/api/verifyToken", {
                    method : "POST",
                    headers : { "Content-Type" : "application/json"},
                    body : JSON.stringify({
                        "token" : token
                    }) 
                })
                .then(function convertToJSON(response) {
                    return response.json();
                })
                .then(function handleData(response) {
                    setExistingJWTUsernameOrEmail(response.usernameOrEmail);
                    setExistingJWTPassword(response.password);
                })
                .catch(function catchError(error){
                    console.log(error);
                })                
            }
        }, [])


        return(
            <>
                <div className="flex">
                    <div className={styles.container}>
                        <h2> Log In</h2>
                        <form onSubmit={handleClick}>
                            <div className={styles['input-box']}>
                                <label htmlFor="username">Username/Email: </label>
                                <input type="text" name="username"id="username"
                                value={existingJWTUsernameOrEmail}
                                onChange={function(event) {
                                    setExistingJWTUsernameOrEmail(event.target.value);
                                }}
                                /> 
                            </div>

                            <div className={styles['input-box']}>
                                <label htmlFor="password">Password: </label>
                                <input type="text"name="password"id="password"
                                value={existingJWTPassword}
                                onChange={function(event) {
                                    setExistingJWTPassword(event.target.value);
                                }}

                                />
                            </div>
                            
                            <div>
                                <button type='submit'>Login</button>
                            </div>

                            <div className={styles.signup}>
                                <Link to="/signup">Don't have an account? Sign up here!</Link>
                            </div>

        
                        </form>
                        <p>{`${messageOne}`}</p>
                        {/* <p>{messageTwo}</p> */}    
                    </div>
                </div>
            </>
        );
    }

    export default Login;
