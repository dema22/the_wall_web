import './App.css';
import { Register }  from './components/Register'
import { Login } from "./components/Login"
import { Home } from "./components/Home"
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

function App() {
  return <BrowserRouter>

      <Routes>
          <Route path="/" element={<Home/>} ></Route>
          <Route path="/register" element={<Register/>} ></Route>
          <Route path="/login" element={<Login/>} ></Route>
      </Routes>
  </BrowserRouter>;
}

export default App;
