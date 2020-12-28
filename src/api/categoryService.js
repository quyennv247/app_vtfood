import httpClient from '../api';
const API_CONTROLLER = 'Category/';

export default {
    getCategories(parentId) {
        let url = API_CONTROLLER + 'GetCategories';
        return httpClient.get(url, {
            params: {
                parentId: parentId
            }
        });
    },

    getById(id) {
        let url = API_CONTROLLER + 'GetById';
        return httpClient.get(url, {
            params: {
                id: id
            }
        });
    },
}