import styles from "./front.module.css"
import { Link } from 'react-router-dom'

function FrontPage() {
    return ( 
        <>
            <div className="flex">
                <div className={styles.container}>
                    <h1>Joti's Expense Tracker</h1>

                    <div className={styles.box}>
                        <Link to="/login">Already have an account? Log in!</Link>
                    </div>

                    <br/>

                    <div className={`${styles.box} ${styles.c1}`}>
                        <Link id="c1" to="/signup">Need to register an account? Sign up!</Link>
                    </div>                    

                </div>
            </div>
        </>
    );
}

export default FrontPage;