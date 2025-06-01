import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IndexPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/weapons?search=${encodeURIComponent(search)}`);
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto mt-10">
      {/* Top section: News + Quick Actions */}
      <div className="flex gap-8">
        {/* News Section */}
        <div className="card bg-base-100 border border-base-300 shadow-xl flex-1">
          <div className="card-body">
            <h2 className="card-title text-xl mb-2">Nyheder</h2>
            <ul className="space-y-2">
              <li>
                <span className="font-semibold">01/06/2025:</span> Velkommen til Vaabenbogen! Dette er en demo-nyhed. Her kan du vise vigtige opdateringer eller informationer til brugerne.
              </li>
              <li>
                <span className="font-semibold">28/05/2025:</span> Systemet er nu opdateret med nye funktioner. Flere nyheder kommer snart!
              </li>
              <li>
                <span className="font-semibold">20/05/2025:</span> Husk at holde dine oplysninger opdaterede.
              </li>
            </ul>
          </div>
        </div>
        {/* Quick Actions */}
        <div className="card bg-base-100 border border-base-300 shadow-xl flex-1 max-w-xs">
          <div className="card-body items-center">
            <h2 className="card-title text-xl mb-4">Hurtige handlinger</h2>
            <div className="flex flex-col gap-3 w-full">
              <button
                className="btn btn-success w-full"
                onClick={() => navigate("/weapons/create")}
              >
                Opret våben
              </button>
              <button
                className="btn btn-primary w-full"
                onClick={() => navigate("/weapons")}
              >
                Se våbenliste
              </button>
              <button
                className="btn btn-primary w-full"
                onClick={() => navigate("/customers")}
              >
                Kunder
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom section: Weapon Search */}
      <div className="card bg-base-100 border border-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">Søg efter våben</h2>
          <form className="flex gap-4" onSubmit={handleSearch}>
            <input
              className="input input-bordered flex-1"
              placeholder="Indtast våbennavn, serienummer eller kategori..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Søg
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}