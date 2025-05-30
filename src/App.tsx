import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'
import WeaponList from "./pages/weapon/WeaponList";
import WeaponCreate from "./pages/weapon/WeaponCreate";
import WeaponEdit from "./pages/weapon/WeaponEdit";
import WeaponDetail from "./pages/weapon/WeaponDetail";
import Login from "./pages/login/Login";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar bg-base-200 mb-4">
        <div className="flex-1 flex items-center gap-2">
          <Link to="/" className="btn btn-ghost text-2xl px-4 py-2">Vaabenbogen</Link>
          <Link to="/weapons" className="btn btn-ghost text-xl px-4 py-2">Våben</Link>
        </div>
        <div className="flex-none">
          <Link to="/login" className="btn btn-ghost text-xl px-4 py-2">Login</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<div>Welcome to Vaabenbogen</div>} />
        <Route path="/weapons" element={<WeaponList />} />
        <Route path="/weapons/create" element={<WeaponCreate />} />
        <Route path="/weapons/:id/edit" element={<WeaponEdit />} />
        <Route path="/weapons/:id" element={<WeaponDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
