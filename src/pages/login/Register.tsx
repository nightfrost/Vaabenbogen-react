import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserApi } from "../../vaabenportalen-api/apis/UserApi";
import type { UserCreateDTO } from "../../vaabenportalen-api/models/UserCreateDTO";
import { withAuthHeaders } from "../../utils/authHeaders";

const api = new UserApi();

export default function Register() {
  const [form, setForm] = useState<UserCreateDTO>({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await api.createUser({ userCreateDTO: form }, withAuthHeaders());
      setSuccess("Bruger oprettet! Du kan nu logge ind.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      setError("Registrering fejlede. Prøv igen. " + err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center mt-20">
      <form
        className="card w-96 bg-base-100 border border-base-300 shadow-xl p-8 space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Opret bruger</h2>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <input
          className="input input-bordered w-full"
          placeholder="Fornavn"
          name="firstName"
          value={form.firstName ?? ""}
          onChange={handleChange}
          required
        />
        <input
          className="input input-bordered w-full"
          placeholder="Efternavn"
          name="lastName"
          value={form.lastName ?? ""}
          onChange={handleChange}
          required
        />
        <input
          className="input input-bordered w-full"
          placeholder="Email"
          name="email"
          type="email"
          value={form.email ?? ""}
          onChange={handleChange}
          required
        />
        <input
          className="input input-bordered w-full"
          placeholder="Brugernavn"
          name="username"
          value={form.username ?? ""}
          onChange={handleChange}
          required
        />
        <input
          className="input input-bordered w-full"
          placeholder="Password"
          name="password"
          type="password"
          value={form.password ?? ""}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Opretter..." : "Opret bruger"}
        </button>
      </form>
    </div>
  );
}