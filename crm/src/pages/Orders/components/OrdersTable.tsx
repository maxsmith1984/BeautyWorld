import { useRef, useState, useEffect } from "react"

import { Button, Table, Modal } from "antd";
import { EditTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';

import { OrderApi } from "../../../common/api";
import { OrderDto } from "../../../common/dto";

const { confirm } = Modal;

const OrdersTable = () => {

    const [orders, setOrders] = useState<OrderDto[]>([])
    const ordersListRef = useRef<any>();

    useEffect(() => {
        OrderApi.getOrder().then(setOrders);
    }, []);

    const removeOrder = (orderId: number) => {
        confirm({
            title: 'Вы уверены, что хотите удалить этот заказ?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Да',
            cancelText: 'Отмена',
            onOk: () => {
                const orderNumber = { id: orderId };

                setOrders(orders.filter(x => x.id !== orderId));
                OrderApi.deleteOrder(orderNumber);
            },

        });
    }

    const formatDate = (createdDate: string): string => {
        const date = new Date(createdDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}.${month}.${year}`;
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
                    <Button icon={<EditTwoTone />} />
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

    return (
        <>
            <div ref={ordersListRef}>
                <Table columns={columns} dataSource={data} />
            </div>
        </>
    )
}

export default OrdersTable