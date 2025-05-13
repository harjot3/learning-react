
function Footer() {
    var year = new Date().getFullYear();

    return(
        <footer className="footer">Copyright &copy; {year} Harjot's Expense Tracker</footer>
    );
}

export default Footer
