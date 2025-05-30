import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { WeaponApi } from "../../vaabenportalen-api/apis/WeaponApi";
import type { Weapon } from "../../vaabenportalen-api/models/Weapon";
import { withAuthHeaders } from "../../utils/authHeaders";

const api = new WeaponApi();

export default function WeaponDetail() {
  const { id } = useParams();
  const [weapon, setWeapon] = useState<Weapon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getWeaponById({ id: Number(id) }, withAuthHeaders()).then(setWeapon).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <span className="loading loading-spinner loading-lg"></span>;
  if (!weapon) return <div>Våben blev ikke fundet.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 border border-base-300 shadow-xl max-w-2xl mx-auto">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">{weapon.name || "Ukendt navn"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <div>
              <span className="font-semibold">ID:</span> {weapon.id}
            </div>
            <div>
              <span className="font-semibold">Fabrikant:</span> {weapon.manufacturer || "-"}
            </div>
            <div>
              <span className="font-semibold">System Nummer:</span> {weapon.systemNumber || "-"}
            </div>
            <div>
              <span className="font-semibold">Pibe Nummer:</span> {weapon.barrelNumber || "-"}
            </div>
            <div>
              <span className="font-semibold">Bundstykke Nummer:</span> {weapon.basepieceNumber || "-"}
            </div>
            <div>
              <span className="font-semibold">Ladefunktion:</span> {weapon.loadFunction || weapon.loadFunctionFreetext || "-"}
            </div>
            <div>
              <span className="font-semibold">Type:</span> {weapon.type ? JSON.stringify(weapon.type) : "-"}
            </div>
            <div>
              <span className="font-semibold">Status:</span> {weapon.status ? JSON.stringify(weapon.status) : "-"}
            </div>
            <div>
              <span className="font-semibold">Oprettet:</span> {weapon.created ? new Date(weapon.created).toLocaleString() : "-"}
            </div>
            <div>
              <span className="font-semibold">Oprettet af:</span> {weapon.createdBy || "-"}
            </div>
            <div>
              <span className="font-semibold">Opdateret:</span> {weapon.updated ? new Date(weapon.updated).toLocaleString() : "-"}
            </div>
            <div>
              <span className="font-semibold">Opdateret af:</span> {weapon.updatedBy || "-"}
            </div>
            <div>
              <span className="font-semibold">Udskrevet:</span> {weapon.discharged ? new Date(weapon.discharged).toLocaleString() : "-"}
            </div>
          </div>
          <div className="space-x-2 mt-6">
            <Link to={`/weapons/${weapon.id}/edit`} className="btn btn-warning">Editér</Link>
            <Link to={`/weapons/${weapon.id}/discharge`} className="btn btn-error">Udskriv</Link>
            <Link to="/weapons" className="btn">Tilbage</Link>
          </div>
        </div>
      </div>
    </div>
  );
}