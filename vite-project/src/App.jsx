import { Routes, Route, Link } from 'react-router-dom';
import SignUp from "./pages/SignUp/signup.jsx"
import Login from "./pages/Login/login.jsx"
import Home from "./pages/Home/home.jsx"
import ConfirmationEmail from "./pages/Email/confirmationEmail.jsx"



function App(props) {

    return (
      <>
        <nav className="navbar">
            <div className="navbarBrandName"> 
                {props.isLogged ? 
                  <Link to="/home">Joti's Expense Tracker</Link> 
                      :
                  <Link to="/login">Joti's Expense Tracker</Link> 
                }
               
            </div>

            <div className="navbarLinks">
              <ul>

                  {props.isLogged ? 
                    <Link to="/home">
                      <img src="/vagabond.png"/>
                    </Link>
                    :
                    <li>
                      <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link> 
                    </li>
                  }

              </ul>
            </div>

        </nav>


      
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/email" element={<ConfirmationEmail/>}/>
        </Routes>
      </>
    );
}

export default App
