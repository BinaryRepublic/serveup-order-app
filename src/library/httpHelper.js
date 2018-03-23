import axios from 'axios'

class HttpHelper {
    constructor(baseUrl = '') {
        this.http = axios.create({
            baseURL: baseUrl
        });
    }
    findGetParameter (parameterName) {
        let result = null,
            tmp = [];
        let items = window.location.search.substr(1).split("&");
        for (let index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        }
        return result;
    }
    get (path, params) {
        const that = this;
        return new Promise((resolve, reject) => {
            let getCfg = that.config;
            getCfg.params = params;
            this.http.get(path, getCfg)
                .then(function (response) {
                    let result = that.encode(response);
                    if (result.status === 200) {
                        resolve(result.data);
                    } else {
                        reject(result);
                    }
                })
                .catch(function (error) {
                    reject(error);
                });
        });
    }
    post (path, params = {}) {
        const that = this;
        return new Promise((resolve, reject) => {
            axios.post(path, params, that.config)
                .then(function (response) {
                    let result = that.encode(response);
                    if (result.status === 200) {
                        resolve(result.data);
                    } else {
                        reject(result);
                    }
                }).catch(error => {
                alert('Error: ' + error.response.data.error.msg);
                reject(error);
            });
        });
    }
    put (path, params = {}) {
        const that = this;
        return new Promise((resolve, reject) => {
            that.http.put(path, params, that.config)
                .then(function (response) {
                    let result = that.encode(response);
                    if (result.status === 200) {
                        resolve(result.data);
                    } else {
                        reject(result);
                    }
                }).catch(error => {
                alert('Error: ' + error.response.data.error.msg);
                reject(error);
            });
        });
    }
    delete (path, params = {}) {
        const that = this;
        return new Promise((resolve, reject) => {
            that.http.delete(path, params, that.config)
                .then(function (response) {
                    let result = that.encode(response);
                    if (result.status === 200) {
                        resolve(result.data);
                    } else {
                        reject(result);
                    }
                }).catch(error => {
                alert('Error: ' + error.response.data.error.msg);
                reject(error);
            });
        });
    }
}

export default HttpHelper;
