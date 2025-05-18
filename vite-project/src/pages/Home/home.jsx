import styles from "./home.module.css"

function Home() {

    return (
        <>
            <div className="flex">
                <div className={styles.container}>
                    <div className={styles.text}>
                        <h1>Hello</h1>
                        <p>This is where you create entries including: </p>
                        <ul>
                            <li>Expenses</li>
                            <li>Deleting or Modifying Expense (Updating)</li>
                            <li>Seeing past Orders</li>
                            <li>Displaying what categories expense fall under</li>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Home;