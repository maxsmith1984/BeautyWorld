import { useState, useEffect } from 'react';
import { Button, DatePicker, DatePickerProps, Form, Input, Modal, Select } from "antd";
import { CreateOrderDto, EmployeeDto, OrderDto, ServicesDto } from "../../../common/dto";
import { EmployeesApi, OrderApi, ServicesApi } from '../../../common/api';
import './style/ComponentsOrderStyle.scss'

interface CreateOrderProps {
    addOrder: (order: OrderDto) => void;
}

const CreateOrder = ({ addOrder }: CreateOrderProps) => {
    const [createOrder, setCreateOrder] = useState(false);

    const [services, setServices] = useState<ServicesDto[]>([]);
    const [masters, setMasters] = useState<EmployeeDto[]>([]);

    const [form] = Form.useForm();
    const [formData, setFormData] = useState<CreateOrderDto>({
        name: '',
        phone: '',
        masterId: 1,
        serviceId: 1,
        visitDate: '',
    });

    useEffect(() => {
        ServicesApi.getServices().then(setServices);
        EmployeesApi.getAll().then(setMasters);
    }, []);

    const handleFormSubmit = () => {
        OrderApi.createOrder(formData)
            .then((response) => {
                addOrder(response);
            })

        setCreateOrder(false);
        onReset();
    }

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        return setFormData({ ...formData, visitDate: dateString });
    };

    const onReset = () => {
        form.resetFields();
    };

    return (<>
        <div className='create-order__wrapper'>
            <Button type="primary" onClick={() => setCreateOrder(true)}>Создать заявку</Button>
        </div>

        <Modal
            title="Создание заявки"
            open={createOrder}
            onCancel={() => setCreateOrder(false)}
            footer={[]}>
            <Form form={form}
                autoComplete="off"
                onFinish={handleFormSubmit}
            >
                <Form.Item name="name" label="Имя" rules={[{ required: true, message: 'Введите Имя клиента' }]}>
                    <Input value={formData.name} onChange={event => setFormData({ ...formData, name: event.target.value })} />
                </Form.Item>

                <Form.Item name="phone" label="Телефон" rules={[{ required: true, message: 'Введите номер телефона клиента' }]}>
                    <Input value={formData.phone} onChange={event => { setFormData({ ...formData, phone: event.target.value }) }} />
                </Form.Item>

                <Form.Item name="masterId" label="Мастер" rules={[{ required: true, message: 'Выберите мастера' }]}>
                    <Select value={formData.masterId} onChange={value => { setFormData({ ...formData, masterId: value }) }}>
                        {masters.map((master) => (
                            <Select.Option key={master.id} value={master.id}>
                                {master.fullName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="serviceId" label="Услуга" rules={[{ required: true, message: 'Выберите услугу' }]}>
                    <Select value={formData.serviceId} onChange={value => { setFormData({ ...formData, serviceId: value }) }}>
                        {services.map((service) => (
                            <Select.Option key={service.id} value={service.id}>
                                {service.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="visitDate" label="Дата визита" rules={[{ required: true, message: 'Введите дату визита' }]}>
                    <DatePicker onChange={onChangeDate} />
                </Form.Item>
                <div className='create-order__button-wraper'>
                    <Button onClick={() => {
                        setCreateOrder(false);
                        onReset();
                    }}>Отмена
                    </Button>
                    <Button type="primary" htmlType="submit" >
                        Создать
                    </Button>
                </div>
            </Form>
        </Modal>
    </>)
}

export default CreateOrder