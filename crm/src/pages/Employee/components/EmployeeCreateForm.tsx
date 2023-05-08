import { Button, Form, Input } from "antd";
import { useState } from "react";

export interface EmployeeCreateFormData {
    name: string;
    lastName: string;
}

export function EmployeeCreateForm({ onCreate }: { onCreate: (data: EmployeeCreateFormData) => void }) {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleForm = () => {
        onCreate({ name, lastName });
    }

    return (
        <Form
            style={{ maxWidth: 300, marginTop: 20 }}
            onFinish={handleForm}>
            <Form.Item>

                <Input value={name} onChange={e => setName(e.target.value)} name='name' placeholder='Имя' />
            </Form.Item>

            <Form.Item>
                <Input value={lastName} onChange={e => setLastName(e.target.value)} name='lastname' placeholder='Фамилия' />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" >
                    Создать
                </Button>
            </Form.Item>
        </Form>
    )
};