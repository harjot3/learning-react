import { useState, useEffect } from 'react';
import styles from "./confirmationEmail.module.css";

function ConfirmationEmail() {

    const [email, setEmail] = useState('');


    function fetchAPI() {
        fetch("http://localhost:5000/api" ,{
            method : 'POST',
            headers : { 'Content-Type' : 'application/json' }
        })
        .then(function convertResponseToJSON(response) {
            return response.json();
        })
        .then(function(response)  {
            setEmail(response.email);
            console.log(response.email);
        }) 
        .catch(function(error) {
            console.log(error);
        });      
    }

    useEffect(function() {
        fetchAPI();
    }, []);

    return(
        <>
            <div className="flex">
                <div className={styles.container}>
                    <h1>hello</h1>
                    <p>{`Your email entered: ${email}`}</p>
                </div>
            </div>
                
        </>
    );
}

export default ConfirmationEmail;