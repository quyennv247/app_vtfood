import httpClient from '../api';
const API_CONTROLLER = 'Slider/';

export default {
    getById(id) {
        let url = API_CONTROLLER + 'GetById';
        return httpClient.get(url, {
            params: {
                id: id
            }
        });
    },

    getAll() {
        let url = API_CONTROLLER + 'GetAll';
        return httpClient.get(url);
    },
}