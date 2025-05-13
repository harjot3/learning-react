import styles from "./Card.module.css"
import naota from "../../assets/naota.jpg"

function Card() {

    return (
        <>
            <div className={styles["card-container"]}>
                <img className={styles["card-image"]} src={naota}></img>
                <h1 className={styles["card-header"]}>Naota Nandaba</h1>
                <p className={styles["card-text"]}>The protagonist of Fooly Cooly</p>
            </div>
        </>
    );
}

export default Card
