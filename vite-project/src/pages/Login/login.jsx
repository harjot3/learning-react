import styles from "./login.module.css";

function Login() {

    return(
        <>
            <div className="flex">
                <div className={styles.container}>
                    <h2> This is where the login box will be </h2>
                    <form>
                        <div className={styles['input-box']}>
                            <label htmlFor="username">Username: </label>
                            <input type="text"name="username"id="username"/> 
                        </div>

                        <div className={styles['input-box']}>
                            <label htmlFor="password">Password: </label>
                            <input type="text"name="password"id="password"/>
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
