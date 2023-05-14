import { FormEvent, useState } from "react";
import { Button } from "../../../components/Button";

export interface EmployeeCreateFormData {
    name: string;
    lastName: string;
}

export function EmployeeCreateForm({ onCreate }: { onCreate: (data: EmployeeCreateFormData) => void }) {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleForm = (event: FormEvent) => {
        event.preventDefault();
        onCreate({ name, lastName });
    }

    return (
        <form onSubmit={handleForm}>
            <input value={name} onChange={e => setName(e.target.value)} name='name' placeholder='Имя' />
            <input value={lastName} onChange={e => setLastName(e.target.value)} name='lastname' placeholder='Фамилия' />
            <Button>Добавить</Button>
        </form>
    )
};