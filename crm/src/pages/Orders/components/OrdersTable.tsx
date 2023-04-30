import { useRef, useState, useEffect } from "react"

import { Button, Table } from "antd";
import { EditTwoTone } from '@ant-design/icons';

import { OrderApi } from "../../../common/api"
import { OrderDto } from "../../../common/dto"

const OrdersTable = () => {

    const [orders, setOrders] = useState<OrderDto[]>([])
    const ordersListRef = useRef<any>();

    useEffect(() => {
        OrderApi.getOrder().then(setOrders);
    }, []);

    const removeOrder = (orderId: number) => {
        setOrders(orders.filter(x => x.id !== orderId))
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
        },
        {
            title: 'Дата визита',
            dataIndex: 'visitDate',
            key: 'visitDate',
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