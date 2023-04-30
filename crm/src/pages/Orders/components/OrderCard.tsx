import { OrderDto } from "../../../common/dto";

interface OrderCardProps {
    order: OrderDto
    onRemove: () => void;
}

export function OrderCard({ order, onRemove }: OrderCardProps) {

    return (
        <div>

            <div>{order.customer.firstName}</div>
            <div>{order.createdDate}</div>
            <div>{order.status}</div>
            <div>{order.id}</div>
            <div>{order.visitDate}</div>
            <div>{order.finishStatus}</div>

            <button onClick={onRemove}>Удалить</button>
        </div>


    );
}