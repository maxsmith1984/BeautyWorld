import { AuthDataDto } from "../dto";
import { HttpServise } from "./HttpServise";

interface TokenDto {
    access_token: string
}

class AppApi extends HttpServise {
    login(data: AuthDataDto) {
        return this.post<TokenDto>('login', data);
    }
}

export default new AppApi()