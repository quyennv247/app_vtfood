import httpClient from '../api';
const API_CONTROLLER = 'Product/';

export default {
    getByShop(pageIndex, pageSize, shopId) {
        let url = API_CONTROLLER + 'GetByShop';
        return httpClient.get(url, {
            params: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                shopId: shopId
            }
        });
    },
    
    getBestSeller(pageIndex, pageSize, latitude, longitude) {
        let url = API_CONTROLLER + 'GetBestSeller';
        return httpClient.get(url, {
            params: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                latitude: latitude,
                longitude: longitude
            }
        });
    },
}