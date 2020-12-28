import httpClient from '../api';
const API_CONTROLLER = 'Keyword/';

export default {
    getAll() {
        return httpClient.get(API_CONTROLLER + 'GetAll');
    },
}