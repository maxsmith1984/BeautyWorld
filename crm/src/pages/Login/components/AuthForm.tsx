import { FormEventHandler, useRef, useState } from "react";
import { AuthDataDto } from "../../../common/dto";

import { Button, Input, Form } from 'antd';
import './loginForm.scss'

interface AuthFormProps {
    onLogin: (authData: AuthDataDto) => void;
}

export function AuthForm(props: AuthFormProps) {
    const form = useRef<any>();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: FormEventHandler<HTMLFormElement> | any): void => {
        event.preventDefault();
        props.onLogin({ userName, password });

        reset();
    };

    const reset = () => {
        setUserName('');
        setPassword('');
    };

    return (<>
        <div className="container">
            <div className="login-form__wrapper">
                <div className="login-form__inner">
                    <h1>Логин</h1>
                    <Form ref={form} name="basic"
                        initialValues={{ remember: true }}
                        autoComplete="off">
                        <Form.Item>
                            <Input id="name" type="text" required value={userName} onChange={event => setUserName(event.target.value)} placeholder='Имя пользователя' />
                        </Form.Item>

                        <Form.Item>
                            <Input id="name" type="password" required value={password} onChange={event => setPassword(event.target.value)} placeholder='Пароль' />
                        </Form.Item>

                        <Button type="primary" onClick={handleSubmit}>Войти</Button>
                    </Form>
                </div>
            </div>
        </div>
    </>)
}