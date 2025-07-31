    import { Link , useNavigate } from 'react-router-dom';
    import {useState, useEffect} from 'react';
    import styles from "./signup.module.css";

    function SignUp() {

        // useState Variables
        const [email, setEmail] = useState('');
        const [enteredEmail, setEnteredEmail] = useState('');
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const [usernameLengthMessage, setUsernameLengthMessage] = useState('');
        const [passwordLengthMessage, setPasswordLengthMessage] = useState('');

        // Response from localhost:3000/api fetch response
        const [incomingMessageOne, setIncomingMessageOne] = useState('');

        const navigate = useNavigate();

        function handleClick(event) {
            event.preventDefault(); // stops the form from restarting page
             
            if (passwordLengthMessage === '' && usernameLengthMessage === '') {
                fetch("http://localhost:3000/api/register", {
                    method : 'POST',
                    headers : {
                        'Content-Type' : "application/json"
                    },
                    body : JSON.stringify ({
                        email : email,
                        username : username,
                        password : password,
                    })
                })
                .then(function convertResponseToJSON(response) {
                    return response.json();
                })
                .then(function handleResponseData(response) {
                    setIncomingMessageOne(response.messageOne);
                })
                .catch(function catchError(error) {
                    console.log(error);
                });
            }
        }

        useEffect(function() {
            if (incomingMessageOne === `Welcome to Joti's Expense Tracker`) {
                navigate('/verify');
            }
        }, [incomingMessageOne])

        return( 
            <>
                <div className ="flex">
                    <div className={styles.container}>
                        <form onSubmit={handleClick}>
                            
                                <h1>Sign Up</h1>

                                <div className={styles.formInput}>
                                    
                                    <input type="text" name="email" 
                                    id="email" placeholder='Email'
                                    value={email}
                                    onChange={function(event) {
                                        setEmail(event.target.value);
                                    }}
                                    required>
                                    </input>
                                </div>

                                <div className={styles.formInput}>
                                    
                                    <input type="text" name="username" 
                                    id="username" placeholder='Username'
                                    value={username}
                                    onChange={function(event) {
                                        setUsername(event.target.value);
                                        /* if username < 5 characters, gives warning */
                                        if ((event.target.value).length >= 5) {
                                            setUsernameLengthMessage('')
                                        } else{
                                            setUsernameLengthMessage('Username must be at least 5 characters');
                                        }
                                    }} 
                                    required>

                                    </input>

                                </div>

                                <div className={styles.formInput}>
                                    
                                    <input type="text" name="password" 
                                    id="password" placeholder='Password'
                                    value={password}
                                    onChange={function(event) {
                                        setPassword(event.target.value);
                                        /* if password < 8 characters, gives warning */
                                        if ((event.target.value).length >= 8) {
                                            setPasswordLengthMessage('')
                                        } else{
                                            setPasswordLengthMessage('Password must be at least 8 characters');
                                        }
                                    }} required>

                                    </input>
                                </div>
                            

                            <div className={styles.register}> 
                                <button type='submit'
                                >Register </button>
                            </div>
                        <p>{`${incomingMessageOne}`}</p>
                        <p>{`${usernameLengthMessage}`}</p>
                        <p>{`${passwordLengthMessage}`}</p>   
                        </form>

                        <div className={styles.login}>
                            <Link to="/login">Already have an account? Login!</Link> 
                        </div>

                    </div>
                </div>
            </>
        );
    }

    export default SignUp;