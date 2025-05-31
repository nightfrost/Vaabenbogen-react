import React, { useState, useEffect } from 'react';
import type { Company } from '../../vaabenportalen-api/models/Company';

interface Props {
    company?: Company;
    disabled?: boolean;
    onSave: (data: Partial<Company>) => void;
    onCancel: () => void;
    isEditing: boolean;
}

export default function CompanyForm({ company, disabled, onSave, onCancel, isEditing }: Props) {
    const [form, setForm] = useState<Partial<Company>>(company ?? {});

    useEffect(() => {
        setForm(company ?? {});
    }, [company]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <input
                className="input input-bordered"
                name="name"
                placeholder="Firmanavn"
                value={form.name ?? ''}
                onChange={handleChange}
                disabled={disabled}
            />
            <input
                className="input input-bordered"
                name="email"
                placeholder="Email"
                value={form.email ?? ''}
                onChange={handleChange}
                disabled={disabled}
            />
            <input
                className="input input-bordered"
                name="phone"
                placeholder="Telefon"
                value={form.phone ?? ''}
                onChange={handleChange}
                disabled={disabled}
            />
            <input
                className="input input-bordered"
                name="cvr"
                placeholder="CVR"
                value={form.cvr ?? ''}
                onChange={handleChange}
                disabled={disabled}
            />
            <input
                className="input input-bordered"
                name="weaponsPassportNumber"
                placeholder="Våbenpas"
                value={form.weaponsPassportNumber ?? ''}
                onChange={handleChange}
                disabled={disabled}
            />
            {isEditing && (
                <div className="flex gap-2 mt-2">
                    <button className="btn btn-primary" type="submit">Gem</button>
                    <button className="btn" type="button" onClick={onCancel}>Annuller</button>
                </div>
            )}
        </form>
    );
}