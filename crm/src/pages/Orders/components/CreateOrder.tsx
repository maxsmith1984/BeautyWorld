import { useState, useEffect } from 'react';
import { Button, ConfigProvider, DatePicker, DatePickerProps, Form, Input, Modal, Select } from "antd";
import { CreateOrderDto, EmployeeDto, ServicesDto } from "../../../common/dto";
import { EmployeesApi, OrderApi, ServicesApi } from '../../../common/api';
import './style/ComponentsOrderStyle.scss'


const CreateOrder = () => {
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
        OrderApi.createOrder(formData);
        setCreateOrder(false);
        onReset();
    }

    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        return setFormData({ ...formData, visitDate: dateString });
    };

    const validateMessages = {
        required: `Заполните все поля`,
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
            footer={[
                <Button key="cancel" onClick={() => {
                    setCreateOrder(false);
                    onReset();
                }}>Отмена
                </Button>,

                <Button key="save" type="primary" onClick={handleFormSubmit}>
                    Создать
                </Button>,
            ]}>
            <ConfigProvider form={{ validateMessages }}>
                <Form validateMessages={validateMessages} form={form} autoComplete="off">
                    <Form.Item name="name" label="Имя" rules={[{ required: true }]}>
                        <Input value={formData.name} onChange={event => setFormData({ ...formData, name: event.target.value })} />
                    </Form.Item>

                    <Form.Item name="phone" label="Телефон" rules={[{ required: true }]}>
                        <Input value={formData.phone} onChange={event => { setFormData({ ...formData, phone: event.target.value }) }} />
                    </Form.Item>

                    <Form.Item name="masterId" label="Мастер" rules={[{ required: true }]}>
                        <Select value={formData.masterId} onChange={value => { setFormData({ ...formData, masterId: value }) }}>
                            {masters.map((master) => (
                                <Select.Option key={master.id} value={master.id}>
                                    {master.fullName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="serviceId" label="Услуга" rules={[{ required: true }]}>
                        <Select value={formData.serviceId} onChange={value => { setFormData({ ...formData, serviceId: value }) }}>
                            {services.map((service) => (
                                <Select.Option key={service.id} value={service.id}>
                                    {service.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="visitDate" label="Дата визита" rules={[{ required: true }]}>
                        <DatePicker value={undefined} onChange={onChangeDate} />
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </Modal>
    </>)
}

export default CreateOrder