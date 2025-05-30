import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../../vaabenportalen-api/apis/LoginApi";

const api = new LoginApi();

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.login({ loginRequest: { username, password } });
      // Assuming response.token contains the JWT or session token
      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/");
      } else {
        setError("Login failed: No token received.");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials." + err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center mt-20">
      <form className="card w-96 bg-base-100 border border-base-300 shadow-xl p-8 space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <input
          className="input input-bordered w-full"
          placeholder="Brugernavn"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          className="input input-bordered w-full"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}