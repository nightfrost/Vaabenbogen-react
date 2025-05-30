import { useEffect, useState } from "react";
import { WeaponApi } from "../../vaabenportalen-api/apis/WeaponApi";
import type { Weapon } from "../../vaabenportalen-api/models/Weapon";
import { Link } from "react-router-dom";
import { withAuthHeaders } from "../../utils/authHeaders";

const api = new WeaponApi();

export default function WeaponList() {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAllWeapons(withAuthHeaders()).then(setWeapons).finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Våben</h2>
      <Link to="/weapons/create" className="btn btn-success mb-4">Opret våben</Link>
      {loading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>ID</th>
                <th>Navn</th>
                <th>Fabrikant</th>
                <th>System Nummer</th>
                <th>Pibe Nummer</th>
                <th>Bundstykke Nummer</th>
                <th>Ladefunktion</th>
                <th>Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {weapons.map((w) => (
                <tr key={w.id}>
                  <td>{w.id}</td>
                  <td>{w.name}</td>
                  <td>{w.manufacturer}</td>
                  <td>{w.systemNumber}</td>
                  <td>{w.barrelNumber}</td>
                  <td>{w.basepieceNumber}</td>
                  <td>{w.loadFunction}</td>
                  <td>
                    <Link to={`/weapons/${w.id}`} className="btn btn-sm btn-info mr-2">Detaljer</Link>
                    <Link to={`/weapons/${w.id}/edit`} className="btn btn-sm btn-warning mr-2">Editér</Link>
                    <Link to={`/weapons/${w.id}/discharge`} className="btn btn-sm btn-error">Udskriv</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}