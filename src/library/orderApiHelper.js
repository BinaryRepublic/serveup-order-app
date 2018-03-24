import HttpHelper from './httpHelper'

class OrderApiHelper {
    constructor (url, restaurantId = false) {
        // initialize httpHelper
        this.http = new HttpHelper(url);
        this.restaurantId = restaurantId;
    }

    getOrders(status) {
        return new Promise((resolve, reject) => {
            if (this.restaurantId) {
                this.http.get('/order/restaurant', {
                    'restaurant-id': this.restaurantId,
                    'status': status
                })
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (error) {
                    reject(error);
                });
            } else {
                reject('no restaurant-id given');
            }
        });
    }
    updateOrderStatus(id, status) {
        return new Promise((resolve, reject) => {
            this.http.put('/order/status', {
                id: id,
                status: status
            })
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });
        });
    }
}
export default OrderApiHelper;
