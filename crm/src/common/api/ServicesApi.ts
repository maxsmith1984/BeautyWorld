import { ServicesDto } from "../dto";
import { HttpService } from "../services/HttpService";

class ServicesApi extends HttpService {
    constructor() {
        super('services');
    }
    getAll(): Promise<ServicesDto[]> {
        return this.get('');
    }
}

export default new ServicesApi();
