import { EmployeeDto } from "../dto";
import { HttpServise } from "./HttpServise";

class EmployeesApi extends HttpServise {
    constructor() {
        super('staff');
    }
    getAll() {
        return this.get<EmployeeDto>('');
    }
}

export default new EmployeesApi();