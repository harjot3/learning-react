
function Props(props) {
    if (props.isLogged) {
        return <h1>Welcome {props.username}</h1>
    }
    return <h1>Log in Plz</h1>
}

export default Props    