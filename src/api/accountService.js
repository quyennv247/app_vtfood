import httpClient from '../api';
const API_CONTROLLER = 'User/';

export default {
    login(data) {
        let url = API_CONTROLLER + 'Login';
        return httpClient.post(url, data);
    },
    
    registry(data) {
        let url = API_CONTROLLER + 'Registry';
        return httpClient.post(url, data);
    },

    changePassword(password, newPassword) {
        let url = API_CONTROLLER + 'ChangePassword';
        return httpClient.get(url, {
            params: {
                password: password,
                newPassword: newPassword
            }
        });
    },

    getInfo() {
        return httpClient.get(API_CONTROLLER + 'GetInfo');
    },
}