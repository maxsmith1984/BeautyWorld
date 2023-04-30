import { useRef, useState, useEffect } from "react"
import { OrderApi } from "../../../common/api"
import { OrderDto } from "../../../common/dto"
import './OrderTableStyle.css'
import { OrderCard } from './OrderCard'

const OrdersTable = () => {

    const [orders, setOrders] = useState<OrderDto[]>([])
    const ordersListRef = useRef<any>();

    useEffect(() => {
        OrderApi.getOrder().then(setOrders);
    }, []);

    const removeOrder = (ordersId: number) => {
        setOrders(orders.filter(x => x.id !== ordersId))
    }

    return (
        <>
            <div ref={ordersListRef}  >
                {orders.map(order =>
                    <OrderCard
                        onRemove={() => removeOrder(order.id)}
                        key={order.id}
                        order={order}
                    />)}
            </div>
        </>
    )
}

export default OrdersTable