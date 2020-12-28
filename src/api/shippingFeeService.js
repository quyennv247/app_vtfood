import httpClient from '../api';
const API_CONTROLLER = 'ShippingFee/';

export default {
    getFee(distance) {
        let url = API_CONTROLLER + 'GetFee';
        return httpClient.get(url, {
            params: {
                distance: distance
            }
        });
    },
}