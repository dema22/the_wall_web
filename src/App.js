import './App.css';
import { Register }  from './components/Register'
import { Login } from "./components/Login"
import { Home } from "./components/Home"
import {BrowserRouter, Routes, Route, Router} from "react-router-dom";
import Navbar from "./components/Navbar";
import {Profile} from "./components/Profile";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Navbar/>
          <Routes>
              <Route path="/" element={<Home/>} ></Route>
              <Route path="/register" element={<Register/>} ></Route>
              <Route path="/login" element={<Login/>} ></Route>
              <Route path="/profile"
                     element={
                        // We are passing to protected route the profile children
                        <ProtectedRoute>
                            <Profile/>
                        </ProtectedRoute>
                     }>
              </Route>
              <Route path="*" element={<Home/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  )
}

export default App;
