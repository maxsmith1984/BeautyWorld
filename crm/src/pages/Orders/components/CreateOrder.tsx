import { useState, useEffect } from 'react';
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { CreateOrderDto, EmployeeDto, ServicesDto } from "../../../common/dto";
import { EmployeesApi, OrderApi, ServicesApi } from '../../../common/api';

const CreateOrder = () => {
    const [createOrder, setCreateOrder] = useState(false);
    const [form] = Form.useForm();
    const [services, setServices] = useState<ServicesDto[]>([]);
    const [masters, setMasters] = useState<EmployeeDto[]>([]);

    useEffect(() => {
        ServicesApi.getServices().then(setServices);
        EmployeesApi.getAll().then(setMasters);
    }, []);

    const sendNewOrder = (CreateOrderDto: CreateOrderDto) => {
        OrderApi.createOrder(CreateOrderDto);
        setCreateOrder(false);
    };

    return (<>
        <Button type="primary" onClick={() => setCreateOrder(true)}>Создать заявку</Button>

        <Modal
            title="Создание заявки"
            open={createOrder}
            onCancel={() => setCreateOrder(false)}
            footer={[
                <Button key="cancel" onClick={() => setCreateOrder(false)}>
                    Отмена
                </Button>,
                <Button key="save" type="primary" onClick={() => createOrder}>
                    Создать
                </Button>,
            ]}>
            <Form form={form} onFinish={sendNewOrder}>
                <Form.Item name="name" label="Имя" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Телефон" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="masterId" label="Мастер" rules={[{ required: true }]}>
                    <Select>
                        {masters.map((master) => (
                            <Select.Option key={master.id} value={master.id}>
                                {master.fullName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="serviceId" label="Услуга" rules={[{ required: true }]}>
                    <Select>
                        {services.map((service) => (
                            <Select.Option key={service.id} value={service.id}>
                                {service.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="visitDate" label="Дата визита" rules={[{ required: true }]}>
                    <DatePicker />
                </Form.Item>
            </Form>
        </Modal>
    </>)
}

export default CreateOrder