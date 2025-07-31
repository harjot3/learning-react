import { useState, useEffect } from 'react'
import styles from "./verify.module.css"

function Verify() {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const [enteredVericationCode, setEnteredVericationCode] = useState('');

    const [selectedSendEmail, setSelectedSendEmail] = useState(false);

    const [timer, setTimer] = useState(0)

    const [message, setMessage] = useState('');

    const [disableButton, setDisableButton] = useState(false);

    const sendMail = function() {
        if (timer < 1) {
            fetch("", {
                method : "POST",
                headers : { "Header-Type" : "application/json" },
                body : JSON.stringify({
                    timer
                })
            })
        }
    }

    const buttonToSendCode = function() {
        setSelectedSendEmail(true);
    }

    const beginTimer = function() {
        let time = 600; // 600 seconds, 10 minutes
        setTimer(time);
        setInterval(function() {
            setTimer(time - 1)
            time --;

            if (time < 1) {
                clearInterval;
            }
        }, 1000)
    }

    useEffect(function() {
        if (timer < 1) {
            setDisableButton(false);
        } else{
            setDisableButton(true);
        }
    }, timer)

    return(
        <>
            <div className="flex">
                <div className={styles.container}>
                    <h1>Verification Code</h1>
                    <h2>{`Welcome to Joti's Expense Tracker ${username}`}</h2>

                    <button
                        name="clickToSendCode" for="clickToSendCode"
                        type="button" onClick={function() {
                            buttonToSendCode();
                            beginTimer();
                        }}
                    >
                    Click Here to Send Verification Code
                    </button>


                    {selectedSendEmail ? 
                        <>
                            <p>{`${message}`}</p>
                            <p>{`You can send another email in ${Math.floor(timer / 60)} minutes
                            and ${timer % 60} seconds.`}</p>
                            <p>{`Enter Verification Code Here:`}</p>

                            <div className={styles.test}>
                                <div className={styles.verificationCodeBox}>
                                    <input
                                    name="" for="" id=""
                                    onChange={function(event) {
                                        setEnteredVericationCode(event.target.value)
                                    }}
                                    ></input>
                                </div>


                                <div className={styles.submitButton}>
                                    <button>
                                        Click here
                                    </button>
                                </div>
                            </div>
                        </>

                        :
                        <>
                            
                        </> }
                </div>
            </div>
        </>
    );
}

export default Verify;

/*

    {allowVerificationCodeMessageBox ? (

                                <>                                     
                                    <p>{`To complete registration, please enter the verification code sent to ${enteredEmail}`}</p>
                                    <p><b>{`Check your Junk Email if not in Inbox... ${verificationCode}`}</b></p>
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
                                                Submit Verification Code
                                            </button>
                                        </div>
                                    </form>


                                </>
                                ) : (
                                <></> 
                            )}


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