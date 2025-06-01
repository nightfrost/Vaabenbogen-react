import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css'
import WeaponList from "./pages/weapon/WeaponList";
import WeaponCreate from "./pages/weapon/WeaponCreate";
import WeaponEdit from "./pages/weapon/WeaponEdit";
import WeaponDetail from "./pages/weapon/WeaponDetail";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import CustomerPage from "./pages/customer/CustomerPage";
import IndexPage from "./pages/Index";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar bg-base-200 mb-4">
        <div className="flex-1 flex items-center gap-2">
          <Link to="/" className="btn btn-ghost text-2xl px-4 py-2">Vaabenbogen</Link>
          <Link to="/weapons" className="btn btn-ghost text-xl px-4 py-2">Våben</Link>
          <Link to="/customers" className="btn btn-ghost text-xl px-4 py-2">Kunder</Link>
        </div>
        <div className="flex-none">
          <Link to="/login" className="btn btn-ghost text-xl px-4 py-2">Login</Link>
          <Link to="/register" className="btn btn-ghost text-xl px-4 py-2">Opret bruger</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<IndexPage/>} />
        <Route path="/weapons" element={<WeaponList />} />
        <Route path="/weapons/create" element={<WeaponCreate />} />
        <Route path="/weapons/:id/edit" element={<WeaponEdit />} />
        <Route path="/weapons/:id" element={<WeaponDetail />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
