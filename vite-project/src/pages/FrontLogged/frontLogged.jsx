import { Link, useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import styles from './frontLogged.module.css'


function FrontLoggedPage() {

    const navigate = useNavigate();

    function signOut() {
        localStorage.setItem("isLogged", "false");
        navigate('/')
    }

    useEffect(function() {
        console.log("apples");
    }, [])  

    return ( 
        <>
            <div className="flex">
                <div className={styles.container}>
                    <h1>Joti's Expense Tracker</h1>

                    <button type="button" onClick={signOut}>Sign Out</button>
                </div>
            </div>
        </>
    );
}

export default FrontLoggedPage;