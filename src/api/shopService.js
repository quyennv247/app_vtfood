import httpClient from '../api';
const API_CONTROLLER = 'Shop/';

export default {
    getById(id, latitude, longitude) {
        let url = API_CONTROLLER + 'GetById';
        return httpClient.get(url, {
            params: {
                id: id,
                latitude: latitude,
                longitude: longitude,
            }
        });
    },

    getHome(pageIndex, pageSize, latitude, longitude) {
        let url = API_CONTROLLER + 'GetHome';
        return httpClient.get(url, {
            params: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                latitude: latitude,
                longitude: longitude
            }
        });
    },

    getNear(pageIndex, pageSize, latitude, longitude) {
        let url = API_CONTROLLER + 'GetNear';
        return httpClient.get(url, {
            params: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                latitude: latitude,
                longitude: longitude,
                distance: 10
            }
        });
    },

    getByCategory(pageIndex, pageSize, latitude, longitude, categoryId) {
        let url = API_CONTROLLER + 'Search';
        return httpClient.get(url, {
            params: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                latitude: latitude,
                longitude: longitude,
                categoryId: categoryId
            }
        });
    },

    search(pageIndex, pageSize, latitude, longitude, categoryId, locationId, keyword) {
        let url = API_CONTROLLER + 'Search';
        return httpClient.get(url, {
            params: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                latitude: latitude,
                longitude: longitude,
                categoryId: categoryId,
                locationId: locationId,
                keyword: keyword
            }
        });
    },

    getBySlider(pageIndex, pageSize, latitude, longitude, sliderId) {
        let url = API_CONTROLLER + 'GetBySlider';
        return httpClient.get(url, {
            params: {
                pageIndex: pageIndex,
                pageSize: pageSize,
                latitude: latitude,
                longitude: longitude,
                sliderId: sliderId
            }
        });
    },

}