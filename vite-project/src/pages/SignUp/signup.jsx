    import { Link , useNavigate } from 'react-router-dom';
    import styles from "./signup.module.css";
    import {useState, useEffect} from 'react';

    

    function SignUp() {

        // useState Variables
        const [email, setEmail] = useState('');
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const [usernameLengthMessage, setUsernameLengthMessage] = useState('');
        const [passwordLengthMessage, setPasswordLengthMessage] = useState('');

        // Response from localhost:5000/api fetch response
        const [incomingMessageOne, setIncomingMessageOne] = useState('');
        const [verificationCode, setVerificationCode] = useState('');

        const [verificationCodeEntered, setVerificationCodeEntered] = useState('');
        const [allowVerificationCodeMessageBox, setAllowVerificationCodeMessageBox] = useState(false);
        const [correctVerificationCodeEntered, setCorrectVerificationCodeEntered] = useState(false);
        const [demoMsg, setDemoMsg] = useState('');

        const navigate = useNavigate();

        function handleClick(event) {
            event.preventDefault(); // stops the form from restarting page
             
            if (passwordLengthMessage === '' && usernameLengthMessage === '') {
                fetch("http://localhost:5000/api/register", {
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
                    setVerificationCode(response.verification_code);

                    if (!response.existingUsername && !response.existingEmail) {
                        setAllowVerificationCodeMessageBox(true);
                    }
                
                })
                .catch(function catchError(error) {
                    console.log(error);
                    
                });
            }
        }

        function handleVerificationCodeClick(event) {
            event.preventDefault(); 
            if (correctVerificationCodeEntered) {
                fetch("http://localhost:5000/api/verify" ,{ 
                    method : 'POST',
                    headers :  { "Content-Type" : "application/json" },
                    body : JSON.stringify({
                        correctVerificationCodeEntered : correctVerificationCodeEntered
                    })  
                })
                setDemoMsg("Correct Verification Code Entered, routing you to Login Page in 3..2..1");
                setTimeout( function() {
                    navigate('/login');
                }, 2000)

            } else {
                setDemoMsg("That is the incorrect Verification Code");
            }
        }


        useEffect(function() {
            if (verificationCodeEntered.toString() === verificationCode.toString()) {
                setCorrectVerificationCodeEntered(true); 
            } else {
                setCorrectVerificationCodeEntered(false);
            }
        }, [verificationCodeEntered])

        return( 
            <>
                <div className ="flex">
                    <div className={styles.container}>
                        <form onSubmit={handleClick}>
                            
                                <h1>Sign Up</h1>

                                <div className={styles.formInput}>
                                    
                                    <input type="text" name="email" 
                                    id="email" placeholder='Email'
                                    onChange={function(event) {
                                        setEmail(event.target.value);
                                    }}
                                    required>
                                    </input>
                                </div>

                                <div className={styles.formInput}>
                                    
                                    <input type="text" name="username" 
                                    id="username" placeholder='Username'
                                    onChange={function(event) {
                                        setUsername(event.target.value);
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
                                    onChange={function(event) {
                                        setPassword(event.target.value);
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
                            {allowVerificationCodeMessageBox ? (

                                <>                                     
                                    <p>{`To complete registration, please enter the verification code sent to ${email}`}</p>
                                    <p>{`Check your Junk Email if not in Inbox... ${verificationCode}`}</p>
                                    <p>{`${demoMsg}`}</p>

                                    <form onSubmit={handleVerificationCodeClick}>
                                        <div className={`${styles.formInput} ${styles.verificationCode}`}>
                                            <input 
                                                className={styles.verificationCode}
                                                type="text"
                                                name="verificationCode"
                                                id="verificationCode"
                                                placeholder="Enter Verification Code"
                                                onChange={function(event) {
                                                    setVerificationCodeEntered(event.target.value);
                                                }}
                                            ></input>
                                        </div>
                                        <div className={styles.apples}> 
                                            <button
                                            type="submit"
                                            >
                                                Click Here
                                            </button>
                                        </div>
                                    </form>


                                </>
                                ) : (
                                <></> 
                            )}

                        <div className={styles.login}>
                            <Link to="/login">Already have an account? Login!</Link> 
                        </div>

                    </div>
                </div>
            </>
        );
    }

    export default SignUp;