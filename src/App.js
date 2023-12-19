import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import NotFound from "./pages/Error/NotFound";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import CreateTask from "./pages/Task/CreateTask";
import EditTask from "./pages/Task/EditTask";
import theme from "./theme";
import Navbar from "./components/navigation/Navbar";
//Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    setDarkMode(storedDarkMode === 'true');
  }, []);

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };


  return (
    <Provider store={store}>
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path='/forgotpassword' element={<ForgotPassword/>} />
          <Route path="/reset-password/:token" element={<ResetPassword/>} />
          <Route path="/task/create" element={<CreateTask/>} />
          <Route path="/task/update/:id" element={<EditTask/>} />
          <Route path="*" element={<NotFound/>} /> 
        </Routes>
      </Router>
    </div>  
    </Provider>
  );
}

export default App;
