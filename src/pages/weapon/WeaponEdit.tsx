import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { WeaponApi } from "../../vaabenportalen-api/apis/WeaponApi";
import type { Weapon } from "../../vaabenportalen-api/models/Weapon";
import { withAuthHeaders } from "../../utils/authHeaders";

const api = new WeaponApi();

export default function WeaponEdit() {
  const { id } = useParams();
  const [form, setForm] = useState<Partial<Weapon>>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getWeaponById({id: Number(id)}, withAuthHeaders()).then(setForm).finally(() => setLoading(false));
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const updatedWeapon: Partial<Weapon> = {
      name: form.name || undefined,
      manufacturer: form.manufacturer || undefined,
      systemNumber: form.systemNumber || undefined,
      barrelNumber: form.barrelNumber || undefined,
      basepieceNumber: form.basepieceNumber || undefined,
      loadFunction: form.loadFunction || undefined,
      loadFunctionFreetext: form.loadFunctionFreetext || undefined,
      type: form.type || undefined,
      status: form.status || undefined,
    };
    await api.updateWeapon({ id: Number(id), weapon: updatedWeapon }, withAuthHeaders());
    setLoading(false);
    navigate("/weapons");
  }

  if (loading) return <span className="loading loading-spinner loading-lg"></span>;

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 border border-base-300 shadow-xl max-w-2xl mx-auto">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Editér indskrevet våben</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label" htmlFor="name">
                <span className="label-text">Navn</span>
              </label>
              <input
                id="name"
                name="name"
                className="input input-bordered w-full"
                placeholder="AK47"
                value={form.name || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="label" htmlFor="manufacturer">
                <span className="label-text">Fabrikant</span>
              </label>
              <input
                id="manufacturer"
                name="manufacturer"
                className="input input-bordered w-full"
                placeholder="Fabrikant"
                value={form.manufacturer || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label" htmlFor="loadFunction">
                <span className="label-text">Ladefunktion</span>
              </label>
              <input
                id="loadFunction"
                name="loadFunction"
                className="input input-bordered w-full"
                placeholder="Ladefunktion"
                value={form.loadFunction || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label" htmlFor="loadFunctionFreetext">
                <span className="label-text">Ladefunktion fritekst</span>
              </label>
              <input
                id="loadFunctionFreetext"
                name="loadFunctionFreetext"
                className="input input-bordered w-full"
                placeholder="Ladefunktion fritekst"
                value={form.loadFunctionFreetext || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label" htmlFor="systemNumber">
                <span className="label-text">System Nummer</span>
              </label>
              <input
                id="systemNumber"
                name="systemNumber"
                className="input input-bordered w-full"
                placeholder="System Nummer"
                value={form.systemNumber || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label" htmlFor="barrelNumber">
                <span className="label-text">Pibe Nummer</span>
              </label>
              <input
                id="barrelNumber"
                name="barrelNumber"
                className="input input-bordered w-full"
                placeholder="Pibe Nummer"
                value={form.barrelNumber || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label" htmlFor="basepieceNumber">
                <span className="label-text">Bundstykke Nummer</span>
              </label>
              <input
                id="basepieceNumber"
                name="basepieceNumber"
                className="input input-bordered w-full"
                placeholder="Bundstykke Nummer"
                value={form.basepieceNumber || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label" htmlFor="type">
                <span className="label-text">Type</span>
              </label>
              <input
                id="type"
                name="type"
                className="input input-bordered w-full"
                placeholder="Type"
                value={form.type || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label" htmlFor="status">
                <span className="label-text">Status</span>
              </label>
              <input
                id="status"
                name="status"
                className="input input-bordered w-full"
                placeholder="Status"
                value={form.status || ""}
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}