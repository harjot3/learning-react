import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import styles from "./verify.module.css"

function Verify() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const [enteredVericationCode, setEnteredVericationCode] = useState('');

    const state = useLocation();

    useEffect(function() {
        try {
            setEmail(state.state.email);
            setUsername(state.state.username)
        } catch {

        }
    }, [])

    /*

    function handleVerificationCodeClick(event) {
            event.preventDefault(); 
            if (correctVerificationCodeEntered) {
                fetch("http://localhost:3000/api/verify", { 
                    method : 'POST',
                    headers :  { 
                        "Content-Type" : "application/json" 
                    },
                    body : JSON.stringify({
                        correctVerificationCodeEntered : correctVerificationCodeEntered
                    })  
                })
                setDemoMsg("Correct Verification Code Entered, routing you to Login Page in 3..2..1");
                setTimeout( function() {
                    navigate('/login');
                }, 3000)

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

    */

    return(
        <>
            <div className="flex">
                <div className={styles.container}>
                    <h1>Verification Code</h1>
                    <h2>{`Welcome to Joti's Expense Tracker ${username}`}</h2>
                    <p>{`A verification code was sent to ${email}`}</p>

                    <div className={styles.verificationCodeBox}>
                        <input
                        name="" for="" id=""
                        onChange={function(event) {
                            setEnteredVericationCode(event.target.value)
                        }}
                        ></input>
                    </div>

                    <p>{`${enteredVericationCode}`}</p>

                    <div className={styles.submitButton}>
                        <button>
                            Enter here
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Verify;