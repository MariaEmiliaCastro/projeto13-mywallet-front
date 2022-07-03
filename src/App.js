import "./assets/css/reset.css";
import "./assets/css/fonts.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./context/UserContext";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import SaidasPage from "./components/SaidasPage";
import EntradasPage from "./components/EntradasPage";

function App() {

  const [token, setToken] = React.useState('');
  const [name, setName] = React.useState('');
  const [url, setUrl] = React.useState('http://localhost:5000');

  return (
    <>
    <UserContext.Provider value={{token, setToken, name, setName, url}}>
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/saida" element={<SaidasPage/>}/>
          <Route path="/entrada" element={<EntradasPage/>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
    </>
  );
}

export default App;
