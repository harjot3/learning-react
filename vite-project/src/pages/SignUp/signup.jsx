import { Link } from 'react-router-dom';
import styles from "./signup.module.css"
import {useState} from 'react'


function SignUp() {

    const [email, setEmail] = useState(defaultValue);
    const [username, setUsername] = useState(defaultValue);
    const [password, setPassword] = useState(defaultValue);
        
    function handleChange() {
        
    }


    return( 
        <>
            <div className ="flex">
                <div className={styles.container}>
                    <form>
                        <div className={styles.formText}>
                            <h1>Sign Up</h1>

                            <div className={styles.formInput}>
                                
                                <input type="text" name="email" 
                                id="email" placeholder='Email'/>

                            </div>

                            <div className={styles.formInput}>
                                
                                <input type="text" name="username" 
                                id="username" placeholder='Username'/>

                            </div>

                            <div className={styles.formInput}>
                                
                                <input type="text" name="password" 
                                id="password" placeholder='Password'/>

                            </div>
                        </div>

                        <div className={styles.register}> 
                            <button type='submit'>Register</button>
                        </div>
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