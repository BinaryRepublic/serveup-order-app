var axios = require('axios');

class HttpHelper {
    constructor(restaurantId = false) {
        if(!restaurantId) {
            restaurantId = this.findGetParameter("restaurant-id")
        }
        this.restaurantId = restaurantId;
    }
    findGetParameter(parameterName) {
        var result = null,
            tmp = [];
        var items = window.location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        }
        return result;
    }

    getOrders(status, serverPort) {
        return new Promise((resolve, reject) => {
            if (this.restaurantId) {
                axios.get('http://138.68.71.39:' + serverPort + '/order?restaurant-id=' + this.restaurantId + '&status=' + status)
                .then(function (response) {
                    resolve(response.data);
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
            axios.put('http://138.68.71.39:3000/order/status', {
                id: id,
                status: status 
            })
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
        });
    }
}

module.exports = HttpHelper;
