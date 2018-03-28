import HttpHelper from '../ro-webapp-helper/http'
import ServerConfig from '../serverConfig'

class OrderApiHelper {
    constructor (restaurantId = false) {
        // initialize httpHelper
        this.cfg = new ServerConfig();
        this.http = new HttpHelper(this.cfg.orderApi, this.cfg.authApi);
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
