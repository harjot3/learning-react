import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import SignUp from "./pages/SignUp/signup.jsx"
import Verify from "./pages/Verify/verify.jsx"
import Login from "./pages/Login/login.jsx"
import Home from "./pages/Home/home.jsx"
import FrontPage from "./pages/Front/front.jsx"
import FrontLoggedPage from './pages/FrontLogged/frontLogged.jsx';

function App() {

    const navigate = useNavigate();

    return (
      <>
        <nav className="navbar">
            <div className="navbarBrandName"> 
                {localStorage.getItem("isLogged") === "true" ? 
                  <Link to="/frontLogged">Joti's Expense Tracker</Link> 
                      :
                  <Link to="/">Joti's Expense Tracker</Link> 
                }
               
            </div>

            <div className="navbarLinks">
              <ul>

                  {localStorage.getItem("isLogged") === "true" ? 
                    <>
                      <li>

                        <Link to="/home">Dashboard</Link>

                      </li>
                      
                      <li>
                        <Link>
                          <img src="/defaultpfp.jpg"/>
                        </Link> 
                      </li>
                    </>
                    
                    :
                    <li>
                      <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link> 
                    </li>
                  }

              </ul>
            </div>

        </nav>     
      
        <Routes>

          <Route 
            path="/" 
            element={<FrontPage/>}
          ></Route>

          <Route 
            path="/signup" 
            element={<SignUp/>}
          ></Route>

          <Route 
            path="/verify" 
            element={<Verify/>}
          ></Route>

          <Route 
            path="/login" 
            element={<Login/>}
          ></Route>

          <Route
            path="/frontLogged"
            element={<FrontLoggedPage/>}
          ></Route>

          <Route 
            path="/home" 
            element={<Home/>}
          ></Route>

        </Routes>
      </>
    );
}

export default App
