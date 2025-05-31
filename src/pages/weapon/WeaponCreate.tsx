import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { CreateWeaponRequest } from "../../vaabenportalen-api/apis/WeaponApi";
import { WeaponApi } from "../../vaabenportalen-api/apis/WeaponApi";
import type { Weapon } from "../../vaabenportalen-api/models/Weapon";
import { withAuthHeaders } from "../../utils/authHeaders";
import { WeaponType } from "../../vaabenportalen-api/models/WeaponType";
import { WeaponStatus } from "../../vaabenportalen-api/models/WeaponStatus";
import { LoadfunctionNullable } from "../../vaabenportalen-api/models/LoadfunctionNullable";
import { PersonApi } from "../../vaabenportalen-api/apis/PersonApi";
import { CompanyApi } from "../../vaabenportalen-api/apis/CompanyApi";
import type { Person } from "../../vaabenportalen-api/models/Person";
import type { Company } from "../../vaabenportalen-api/models/Company";

const api = new WeaponApi();

const weaponTypeOptions = Object.entries(WeaponType)
  .filter(([k, v]) => typeof v === "number")
  .map(([k, v]) => ({ label: k, value: v }));

const weaponStatusOptions = Object.entries(WeaponStatus)
  .filter(([k, v]) => typeof v === "number")
  .map(([k, v]) => ({ label: k, value: v }));

const loadFunctionOptions = Object.entries(LoadfunctionNullable)
  .filter(([k, v]) => typeof v === "number")
  .map(([k, v]) => ({ label: k, value: v }));

export default function WeaponCreate() {
  const [form, setForm] = useState<Partial<Weapon>>({});
  const [loading, setLoading] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [submitterValue, setSubmitterValue] = useState(""); // For personId or companyId
  const [customers, setCustomers] = useState<(Person | Company)[]>([]);
  const [customerLoading, setCustomerLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCustomerLoading(true);
    if (isCompany) {
      new CompanyApi().getAllCompanies(withAuthHeaders())
        .then(setCustomers)
        .finally(() => setCustomerLoading(false));
    } else {
      new PersonApi().getAllPeople(withAuthHeaders())
        .then(setCustomers)
        .finally(() => setCustomerLoading(false));
    }
    setSubmitterValue(""); // Reset selection when toggling
  }, [isCompany]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmitterChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSubmitterValue(e.target.value);
  }

  function handleIsCompanyChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsCompany(e.target.checked);
    setSubmitterValue(""); // Reset submitter value when toggling
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Prepare submitter fields
    let submitterPersonId: number | undefined = undefined;
    let submitterCompanyId: number | undefined = undefined;
    if (submitterValue) {
      if (isCompany) {
        submitterCompanyId = Number(submitterValue);
      } else {
        submitterPersonId = Number(submitterValue);
      }
    }

    const createWeaponRequest: CreateWeaponRequest = {
      weapon: {
        name: form.name || undefined,
        manufacturer: form.manufacturer || undefined,
        loadFunction: form.loadFunction !== undefined
          ? Number(form.loadFunction) as LoadfunctionNullable
          : undefined,
        loadFunctionFreetext: form.loadFunctionFreetext || undefined,
        systemNumber: form.systemNumber || undefined,
        barrelNumber: form.barrelNumber || undefined,
        basepieceNumber: form.basepieceNumber || undefined,
        type: form.type !== undefined 
          ? Number(form.type) as WeaponType
          : undefined,
        status: form.status !== undefined 
          ? Number(form.status) as WeaponStatus
          : undefined,
        submitterPersonId,
        submitterCompanyId,
      }
    };
    try {
      await api.createWeapon(createWeaponRequest, withAuthHeaders());
    } catch (error) {
      console.error("Error creating weapon:", error);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate("/weapons");
  }

  return (
    <div className="container mx-auto p-4">
      <div className="card bg-base-100 border border-base-300 shadow-xl max-w-2xl mx-auto">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Opret Våben</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label" htmlFor="name">
                <span className="label-text">Navn</span>
              </label>
              <input id="name" name="name" className="input input-bordered w-full" placeholder="AK47" onChange={handleChange} required />
            </div>
            <div>
              <label className="label" htmlFor="manufacturer">
                <span className="label-text">Fabrikant</span>
              </label>
              <input id="manufacturer" name="manufacturer" className="input input-bordered w-full" placeholder="Kalashnikov" onChange={handleChange} />
            </div>
            <div>
              <label className="label" htmlFor="loadFunction">
                <span className="label-text">Ladefunktion</span>
              </label>
              <select id="loadFunction" name="loadFunction" className="select select-bordered w-full" onChange={handleChange} value={form.loadFunction ?? ""}>
                <option value="">Vælg ladefunktion</option>
                {loadFunctionOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="loadFunctionFreetext">
                <span className="label-text">Ladefunktion fritekst</span>
              </label>
              <input id="loadFunctionFreetext" name="loadFunctionFreetext" className="input input-bordered w-full" placeholder="Ladefunktion fritekst" onChange={handleChange} />
            </div>
            <div>
              <label className="label" htmlFor="systemNumber">
                <span className="label-text">System Nummer</span>
              </label>
              <input id="systemNumber" name="systemNumber" className="input input-bordered w-full" placeholder="System Nummer" onChange={handleChange} />
            </div>
            <div>
              <label className="label" htmlFor="barrelNumber">
                <span className="label-text">Pibe Nummer</span>
              </label>
              <input id="barrelNumber" name="barrelNumber" className="input input-bordered w-full" placeholder="Pibe Nummer" onChange={handleChange} />
            </div>
            <div>
              <label className="label" htmlFor="basepieceNumber">
                <span className="label-text">Bundstykke Nummer</span>
              </label>
              <input id="basepieceNumber" name="basepieceNumber" className="input input-bordered w-full" placeholder="Bundstykke Nummer" onChange={handleChange} />
            </div>
            <div>
              <label className="label" htmlFor="type">
                <span className="label-text">Type</span>
              </label>
              <select id="type" name="type" className="select select-bordered w-full" onChange={handleChange} value={form.type ?? ""}>
                <option value="">Vælg type</option>
                {weaponTypeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label" htmlFor="status">
                <span className="label-text">Status</span>
              </label>
              <select id="status" name="status" className="select select-bordered w-full" onChange={handleChange} value={form.status ?? ""}>
                <option value="">Vælg status</option>
                {weaponStatusOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            {/* Submitter section */}
            <div>
              <label className="label">
                <span className="label-text">Indskriver er virksomhed?</span>
                <input
                  type="checkbox"
                  className="checkbox ml-2"
                  checked={isCompany}
                  onChange={handleIsCompanyChange}
                />
              </label>
              <label className="label" htmlFor="submitterValue">
                <span className="label-text">
                  {isCompany ? "Vælg virksomhed" : "Vælg person"}
                </span>
              </label>
              <select
                id="submitterValue"
                name="submitterValue"
                className="select select-bordered w-full"
                value={submitterValue}
                onChange={e => setSubmitterValue(e.target.value)}
                disabled={customerLoading}
                required
              >
                <option value="">
                  {customerLoading
                    ? "Indlæser..."
                    : isCompany
                      ? "Vælg virksomhed"
                      : "Vælg person"}
                </option>
                {customers.map(c =>
                  isCompany
                    ? (
                      <option key={c.id} value={c.id}>
                        {(c as Company).name} {(c as Company).email ? `(${(c as Company).email})` : ""}
                      </option>
                    )
                    : (
                      <option key={c.id} value={c.id}>
                        {(c as Person).firstname} {(c as Person).lastname} {(c as Person).email ? `(${(c as Person).email})` : ""}
                      </option>
                    )
                )}
              </select>
            </div>
            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Gemmer..." : "Opret"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}