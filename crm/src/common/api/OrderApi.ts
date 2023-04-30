import { CreateOrderDto, OrderDto, UpdateOrderDto } from "../dto";
import { HttpService } from "../services/HttpService";

class OrderApi extends HttpService {
    constructor() {
        super('orders');
    }

    getOrder(): Promise<OrderDto[]> {
        return this.get('');
    }

    create(CreateOrderDto: CreateOrderDto) {
        return this.post('')
    }

    delete() { }

    update(UpdateOrderDto: UpdateOrderDto) {
        return this.patch('', UpdateOrderDto.customerId, UpdateOrderDto)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new OrderApi();
