import { LoginRequest, RegisterRequest } from '../types/index';
export declare class AuthService {
    static generateToken(userId: string): string;
    static register(userData: RegisterRequest): Promise<{
        user: {
            _id: any;
            username: string;
            email: string;
        };
        token: string;
    }>;
    static login(loginData: LoginRequest): Promise<{
        user: {
            _id: any;
            username: string;
            email: string;
        };
        token: string;
    }>;
}
//# sourceMappingURL=authService.d.ts.map