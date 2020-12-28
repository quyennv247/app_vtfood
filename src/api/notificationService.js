import httpClient from '../api';
const API_CONTROLLER = 'Notification/';

export default {
    filter(pageIndex, pageSize) {
        let url = API_CONTROLLER + 'GetByUser';
        return httpClient.get(url, {
            params: {
                pageIndex: pageIndex,
                pageSize: pageSize
            }
        });
    },
}