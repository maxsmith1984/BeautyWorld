import { useRef, useState, useEffect } from "react"
import dayjs from 'dayjs';
import { Button, Table, Modal, Form, DatePicker, Select, DatePickerProps } from "antd";
import { EditTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';



import { EmployeesApi, OrderApi, ServicesApi } from "../../../common/api";
import { EmployeeDto, OrderDto, ServicesDto, UpdateOrderDto, RecordStatusFinish, RecordStatus } from "../../../common/dto";
import CreateOrder from "./CreateOrder";

const { confirm } = Modal;


const OrdersTable = () => {
    const ordersListRef = useRef<any>();

    const [services, setServices] = useState<ServicesDto[]>([]);
    const [masters, setMasters] = useState<EmployeeDto[]>([]);

    const [orders, setOrders] = useState<OrderDto[]>([]);

    const [editOrder, setEditOrder] = useState(false);

    const [editingOrder, setEditingOrder] = useState<UpdateOrderDto>({
        customerId: 0,
        masterId: 0,
        serviceId: 0,
        visitDate: '',
        status: RecordStatusFinish.Success,
        finishStatus: RecordStatus.Opened,
    });



    useEffect(() => {
        OrderApi.getOrder().then(setOrders);
        ServicesApi.getServices().then(setServices);
        EmployeesApi.getAll().then(setMasters);
    }, []);


    const handleEditOrder = (orderId: number,) => {
        const orderToEdit = orders.find((order) => order.id === orderId);

        if (orderToEdit) {
            setEditingOrder({
                customerId: orderToEdit.customer.id,
                masterId: orderToEdit.master.id,
                serviceId: orderToEdit.service.id,
                visitDate: orderToEdit.visitDate,
                status: orderToEdit.status as RecordStatusFinish,
                finishStatus: orderToEdit.finishStatus as RecordStatus,
            });
            setEditOrder(true);
        }
    };

    const addOrder = (order: OrderDto) => {
        setOrders([order, ...orders]);

    };

    const updateOrder = (updateOrders: UpdateOrderDto) => {
        const updatedOrder = { ...editingOrder, ...FormData };
        console.log(updatedOrder)
        // OrderApi.updateOrder(updatedOrder)
        setEditOrder(false);
    };

    const removeOrder = (orderId: number) => {
        confirm({
            title: 'Вы уверены, что хотите удалить этот заказ?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Да',
            cancelText: 'Отмена',
            onOk: () => {
                const orderNumber = { id: orderId };

                setOrders(orders.filter(order => order.id !== orderId));
                OrderApi.deleteOrder(orderNumber)
            },
        });
    }

    const formatDate = (createdDate: string): string => {
        const date = new Date(createdDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}-${month}-${year}`;
    }

    const columns = [
        {
            title: 'Номер',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Имя',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Дата создания',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (createdDate: string) => formatDate(createdDate),
        },
        {
            title: 'Дата визита',
            dataIndex: 'visitDate',
            key: 'visitDate',
            render: (createdDate: string) => formatDate(createdDate),
        },
        {
            title: 'Мастер',
            dataIndex: 'masterName',
            key: 'masterName',
        },
        {
            title: 'Услуга',
            dataIndex: 'service',
            key: 'service',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Заявка',
            dataIndex: 'finishStatus',
            key: 'finishStatus',
        },
        {
            title: 'Действия',
            key: 'actions',
            render: (order: any) =>
                <div>
                    <Button icon={<EditTwoTone />} onClick={() => handleEditOrder(order.id)} />
                    <Button type="link" onClick={() => removeOrder(order.id)}>Удалить</Button>
                </div>
        },
    ];

    const data = orders.map(order => ({
        key: order.id,
        id: order.id,
        firstName: order.customer.firstName,
        createdDate: order.createdDate,
        visitDate: order.visitDate,
        status: order.status,
        finishStatus: order.finishStatus,
        masterName: order.master.firstName,
        service: order.service.name,
    }));

    const fields = [
        { "name": ["masterId"], "value": editingOrder.masterId },
        { "name": ["serviceId"], "value": editingOrder.serviceId },
        { "name": ["visitDate"], "value": editingOrder.visitDate ? dayjs(editingOrder.visitDate) : null, },
        { "name": ["status"], "value": editingOrder.status },
        { "name": ["finishStatus"], "value": editingOrder.finishStatus },
    ]

    const updateVisitDate: DatePickerProps['onChange'] = (date, dateString) => {
        return setEditingOrder({ ...editingOrder, visitDate: dateString })
    };

    return (
        <>
            <CreateOrder addOrder={addOrder} />

            <Table ref={ordersListRef} columns={columns} dataSource={data} />
            {editingOrder.status}
            <Modal
                title="Редактирование заявки"
                open={editOrder}
                onCancel={() => setEditOrder(false)}
                footer={[]}>

                <Form

                    autoComplete="off"
                    onFinish={updateOrder}
                    fields={fields}
                >

                    <Form.Item name="masterId" label="Мастер" rules={[{ required: true, message: 'Выберите мастера' }]}>

                        <Select onChange={(value) => setEditingOrder({ ...editingOrder, masterId: value })}>
                            {masters.map((master) => (
                                <Select.Option key={master.id} value={master.id}  >
                                    {master.fullName}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="serviceId" label="Услуга" rules={[{ required: true, message: 'Выберите услугу' }]}>
                        <Select onChange={(value) => setEditingOrder({ ...editingOrder, serviceId: value })}>
                            {services.map((service) => (
                                <Select.Option key={service.id} value={service.id}>
                                    {service.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="visitDate" label="Дата визита" rules={[{ required: true, message: 'Введите дату визита' }]}>
                        <DatePicker onChange={updateVisitDate} />
                    </Form.Item>

                    <Form.Item name="status" label="Статус"  >
                        <Select onChange={(value) => setEditingOrder({ ...editingOrder, status: value })}>
                            <Select.Option key="Opened">
                                Opened
                            </Select.Option>
                            <Select.Option key="Closed">
                                Closed
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="finishStatus" label="Заявка"  >
                        <Select onChange={(value) => setEditingOrder({ ...editingOrder, finishStatus: value })}>
                            <Select.Option value="Failed" key="Failed">
                                Failed
                            </Select.Option>
                            <Select.Option value="Success" key="Success">
                                Success
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <div className='create-order__button-wraper'>
                        <Button key="cancel" onClick={() => {
                            setEditOrder(false);
                        }}>Отмена
                        </Button>
                        <Button key="edit" type="primary" htmlType="submit" >
                            Подствердить изменения
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>)
}

export default OrdersTable