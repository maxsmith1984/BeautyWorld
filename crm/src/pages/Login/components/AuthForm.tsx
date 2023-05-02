import { useRef, useState } from "react";
import { AuthDataDto } from "../../../common/dto";

import { Button, Input, Form, } from 'antd';
import './loginForm.scss'

interface AuthFormProps {
    onLogin: (authData: AuthDataDto) => void;
}

export function AuthForm(props: AuthFormProps) {
    const form = useRef<any>();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (values: any) => {
        props.onLogin({ userName, password })

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
                        autoComplete="off"
                        onFinish={handleSubmit}>

                        <Form.Item name="Ваше имя" rules={[{ required: true }]}>
                            <Input id="name" type="text" value={userName} onChange={event => setUserName(event.target.value)} placeholder='Имя пользователя' />
                        </Form.Item>

                        <Form.Item name="Пароль" rules={[{ required: true }]}>
                            <Input id="name" type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder='Пароль' />
                        </Form.Item>

                        <Button type="primary" htmlType="submit" >Войти</Button>
                    </Form>
                </div>
            </div>
        </div>
    </>)
}