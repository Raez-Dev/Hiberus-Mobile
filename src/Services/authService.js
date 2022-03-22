import { instance as interceptor } from './interceptor'

const baseUrl = 'http://51.38.51.187:5050/api/v1/';

const urlLogin = `${baseUrl}auth/log-in`;
const urlSignup = `${baseUrl}auth/sign-up`;

const login = async(LogInDto) => {
    try {
        const response = await interceptor.post(urlLogin, LogInDto);
        return response;
    } catch (error) {
        return error;
    }
}

const signUp = async(SignUpDto) => {
    try {
        const response = await interceptor.post(urlSignup, SignUpDto);
        return response;
    } catch (error) {
        return error;
    }
}

const AuthService = { login, signUp }

export default AuthService;