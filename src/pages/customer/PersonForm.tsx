import React, { useState, useEffect } from 'react';
import type { Person } from '../../vaabenportalen-api/models/Person';

interface Props {
    person?: Person;
    disabled?: boolean;
    onSave: (data: Partial<Person>) => void;
    onCancel: () => void;
    isEditing: boolean;
}

export default function PersonForm({ person, disabled, onSave, onCancel, isEditing }: Props) {
    const [form, setForm] = useState<Partial<Person>>(person ?? {});

    useEffect(() => {
        setForm(person ?? {});
    }, [person]);

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
                name="firstname"
                placeholder="Fornavn"
                value={form.firstname ?? ''}
                onChange={handleChange}
                disabled={disabled}
            />
            <input
                className="input input-bordered"
                name="lastname"
                placeholder="Efternavn"
                value={form.lastname ?? ''}
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
                name="cpr"
                placeholder="CPR"
                value={form.cpr ?? ''}
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