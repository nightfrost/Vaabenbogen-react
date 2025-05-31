import React, { useState, useEffect } from 'react';
import type { Person } from '../../vaabenportalen-api/models/Person';
import type { Company } from '../../vaabenportalen-api/models/Company';
import { CompanyToJSON } from '../../vaabenportalen-api/models/Company';
import { PersonToJSON } from '../../vaabenportalen-api/models/Person';
import { PersonApi } from '../../vaabenportalen-api/apis/PersonApi';
import type { CreatePersonRequest, DeletePersonRequest, UpdatePersonRequest } from '../../vaabenportalen-api/apis/PersonApi';
import { CompanyApi, type CreateCompanyRequest, type DeleteCompanyRequest, type UpdateCompanyRequest } from '../../vaabenportalen-api/apis/CompanyApi';
import PersonForm from './PersonForm.tsx';
import CompanyForm from './CompanyForm.tsx';
import { withAuthHeaders } from '../../utils/authHeaders.tsx';

type CustomerType = 'person' | 'company';
type Customer = (Person & { type: 'person' }) | (Company & { type: 'company' });

const personApi = new PersonApi();
const companyApi = new CompanyApi();

export default function CustomerPage() {
    const [customerType, setCustomerType] = useState<CustomerType>('person');
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selected, setSelected] = useState<Customer | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, [customerType]);

    const fetchCustomers = async () => {
        if (customerType === 'person') {
            const data = await personApi.getAllPeople(withAuthHeaders());
            setCustomers(data.map((p: Person) => ({ ...p, type: 'person' })));
        } else {
            const data = await companyApi.getAllCompanies(withAuthHeaders());
            setCustomers(data.map((c: Company) => ({ ...c, type: 'company' })));
        }
        setSelected(null);
        setIsEditing(false);
    };

    const handleSelect = (customer: Customer) => {
        setSelected(customer);
        setIsEditing(false);
    };

    const handleCreate = () => {
        setSelected(null);
        setIsEditing(true);
    };

    const handleEdit = () => setIsEditing(true);

    const handleCancel = () => {
        setIsEditing(false);
        setSelected(null);
    };

    const handleDelete = async () => {
        if (!selected) return;
        if (selected.type === 'person' && selected.id) {
            const deleteRequest: DeletePersonRequest = { id: selected.id };
            await personApi.deletePerson(deleteRequest, withAuthHeaders());
        } else if (selected.type === 'company' && selected.id) {
            const deleteRequest: DeleteCompanyRequest = { id: selected.id };
            await companyApi.deleteCompany(deleteRequest, withAuthHeaders());
        }
        fetchCustomers();
    };

    const handleSave = async (data: Partial<Person> | Partial<Company>) => {
        if (customerType === 'person') {
            if (selected && selected.id) {
                const updateRequest: UpdatePersonRequest = { id: selected.id, person: PersonToJSON(data as Person) };
                await personApi.updatePerson(updateRequest, withAuthHeaders());
            } else {
                const createRequest: CreatePersonRequest = { person: PersonToJSON(data as Person) };
                await personApi.createPerson(createRequest, withAuthHeaders());
            }
        } else {
            if (selected && selected.id) {
                const updateRequest: UpdateCompanyRequest = { id: selected.id, company: CompanyToJSON(data as Company) };
                await companyApi.updateCompany(updateRequest, withAuthHeaders());
            } else {
                const createRequest: CreateCompanyRequest = { company: CompanyToJSON(data as Company) };
                await companyApi.createCompany(createRequest, withAuthHeaders());
            }
        }
        fetchCustomers();
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center gap-4 mb-6">
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Person</span>
                        <input
                            type="radio"
                            name="customerType"
                            className="radio checked:bg-primary ml-2"
                            checked={customerType === 'person'}
                            onChange={() => setCustomerType('person')}
                        />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <span className="label-text">Firma</span>
                        <input
                            type="radio"
                            name="customerType"
                            className="radio checked:bg-primary ml-2"
                            checked={customerType === 'company'}
                            onChange={() => setCustomerType('company')}
                        />
                    </label>
                </div>
                <button className="btn btn-primary ml-auto" onClick={handleCreate}>
                    Opret ny {customerType === 'person' ? 'person' : 'firma'}
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <div className="card bg-base-100 shadow">
                        <div className="card-body">
                            <h2 className="card-title mb-2">Kunder</h2>
                            <ul className="divide-y">
                                {customers.map(c => (
                                    <li
                                        key={c.id}
                                        className={`py-2 px-2 cursor-pointer rounded hover:bg-base-200 transition ${selected?.id === c.id ? 'bg-primary text-primary-content' : ''}`}
                                        onClick={() => handleSelect(c)}
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-semibold">
                                                {c.type === 'person'
                                                    ? `${c.firstname ?? ''} ${c.lastname ?? ''}`
                                                    : c.name}
                                            </span>
                                            <span className="text-xs opacity-70">{c.email}</span>
                                            <span className="text-xs opacity-70">{c.phone}</span>
                                        </div>
                                    </li>
                                ))}
                                {customers.length === 0 && (
                                    <li className="text-center text-sm text-gray-400 py-4">Ingen kunder fundet.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    {(isEditing || selected) && (
                        <div className="card bg-base-100 shadow">
                            <div className="card-body">
                                <h2 className="card-title mb-2">
                                    {isEditing
                                        ? (selected ? 'Rediger' : 'Opret') + (customerType === 'person' ? ' person' : ' firma')
                                        : 'Detaljer'}
                                </h2>
                                {customerType === 'person' ? (
                                    <PersonForm
                                        person={isEditing ? (selected as Person | undefined) : (selected as Person | undefined)}
                                        disabled={!isEditing}
                                        onSave={handleSave}
                                        onCancel={handleCancel}
                                        isEditing={isEditing}
                                    />
                                ) : (
                                    <CompanyForm
                                        company={isEditing ? (selected as Company | undefined) : (selected as Company | undefined)}
                                        disabled={!isEditing}
                                        onSave={handleSave}
                                        onCancel={handleCancel}
                                        isEditing={isEditing}
                                    />
                                )}
                                {!isEditing && selected && (
                                    <div className="flex gap-2 mt-4">
                                        <button className="btn btn-primary" onClick={handleEdit}>Rediger</button>
                                        <button className="btn btn-error" onClick={handleDelete}>Slet</button>
                                        <button className="btn" onClick={handleCancel}>Luk</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}