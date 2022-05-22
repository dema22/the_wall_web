import './App.css';
import { Register }  from './components/Register'
import { Login } from "./components/Login"
import { Home } from "./components/Home"
import {BrowserRouter, Routes, Route, Router} from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (<BrowserRouter>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>} ></Route>
          <Route path="/register" element={<Register/>} ></Route>
          <Route path="/login" element={<Login/>} ></Route>
      </Routes>
  </BrowserRouter>)
}

export default App;
