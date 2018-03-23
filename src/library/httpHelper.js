import axios from 'axios'
import AuthController from './authController';
import AuthStore from './authStore';

class HttpHelper {
    constructor(baseUrl = '') {
        this.http = axios.create({
            baseURL: baseUrl
        });

        this.config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        this.authStore = new AuthStore();
        this.authController = new AuthController();
        this.authenticationHeader = this.authenticationHeader.bind(this);
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

    authenticationHeader () {
        return new Promise((resolve, reject) => {
            if (this.authStore.authAvailable()) {
                if (this.authStore.isExpired()) {
                    this.authController.refreshToken().then(res => {
                        let token = this.authStore.accessToken();
                        this.config.headers['Access-Token'] = token;
                        resolve();
                    }).catch(err => {
                        reject(err);
                    });
                } else {
                    let token = this.authStore.accessToken();
                    if (token) {
                        this.config.headers['Access-Token'] = token;
                        resolve();
                    } else {
                        reject('NO TOKEN IN AUTH DATA');
                    }
                }
            }
        });
    }
    get (path, params) {
        const that = this;
        return new Promise((resolve, reject) => {
            that.authenticationHeader().then(() => {
                that.http.get(path, params, that.config)
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
            }).catch((err) => {
                console.log(err)
            }); 
        });
    }
    post (path, params = {}) {
        const that = this;
        return new Promise((resolve, reject) => {
            that.authenticationHeader().then(() => {
                that.http.post(path, params, that.config)
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
            }).catch((err) => {
                console.log(err)
            }); 
        });
    }
    put (path, params = {}) {
        const that = this;
        return new Promise((resolve, reject) => {
            that.authenticationHeader().then(() => {
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
            }).catch((err) => {
                console.log(err)
            }); 
        });
    }
    delete (path, params = {}) {
        const that = this;
        return new Promise((resolve, reject) => {
            that.authenticationHeader().then(() => {
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
            }).catch((err) => {
                console.log(err)
            }); 
        });
    }
}

export default HttpHelper;
