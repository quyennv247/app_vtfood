import httpClient from '../api';
const API_CONTROLLER = 'Order/';

export default {
    add(data) {
        let url = API_CONTROLLER + 'Add';
        return httpClient.post(url, data);
    },

    getByUser(pageIndex, pageSize) {
        let url = API_CONTROLLER + 'GetByUser';
        return httpClient.get(url, {
            params: {
                pageIndex: pageIndex,
                pageSize: pageSize
            }
        });
    },
}