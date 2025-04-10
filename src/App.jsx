import './App.css'
import Navbar from "./components/navbar/Navbar.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/login/Login.jsx";
import Register from "./components/register/Register.jsx";
import Profile from "./components/profile/Profile.jsx";
import GroupsDashboard from "./components/groups_dashboard/Groups-Dashboard.jsx";
import PrivateRoute from "./components/protected-routes/PrivateRoutes.jsx";
import {useAuth} from "./context/AuthContext.jsx";

function Home(){
    const {user} = useAuth();

    return (
        <div className="content-home">
            <div className="white-box">
                {user ? (
                    <>
                        <h2>Cieszymy się że jesteś, {user.username}!</h2>
                        <p>Wystarczy przejść do zakładki Fiszki, by zacząć naukę!</p>
                    </>
                    ) : (
                    <>
                        <h2>Witaj w aplikacji do tworzenia fiszek</h2>
                        <p>Zaloguj się bądź utwórz nowe konto by zacząć tworzenie!</p>
                    </>
                )}
            </div>
        </div>
    );
}

function App() {
  return (
      <Router>
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route element={<PrivateRoute/>}>
                    <Route path="/user/profile" element={<Profile/>} />
                    <Route path="/user/groups" element={<GroupsDashboard/>} />
                </Route>
            </Routes>
        </div>
      </Router>
  );
}

export default App
