const API_PATH = 'http://localhost:3005'

export class HttpServise {
    private baseApi: string = 'http://localhost:3005';
    constructor(controllerName: string = '') {
        this.baseApi = `${API_PATH}/api/${controllerName}`;
    }
    get<T>(path: string): Promise<T[]> {
        return fetch(`${this.baseApi}/${path}`)
            .then(response => response.json())
    }
    post() { }
    put() { }
    delete() { }
}