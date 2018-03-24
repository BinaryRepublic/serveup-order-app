import axios from 'axios';
import AuthStore from './authStore';
import HttpHelper from './httpHelper';
import ServerConfig from './serverConfig';

class AuthController {
    constructor () {
        const cfg = new ServerConfig();
        this.authApi = axios.create({
            baseURL: cfg.authApi
        });
        this.loginApi = cfg.orderApi;
        this.config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        this.authStore = new AuthStore();
    };
    requestGrant (mail, password) {
        let that = this;
        return new Promise((resolve, reject) => {
            that.authStore.removeAuth();
            let orderApi = new HttpHelper(this.loginApi);
            orderApi.post('/login', {mail: mail, password: password})
            .then(data => {
                if (data && data.grant && data.accountId) {
                    that.requestToken(data.grant, data.accountId).then(() => {
                        resolve();
                    }).catch(() => {
                        reject();
                    });
                }
            })
            .catch(function (error) {
                console.error(error);
            });
        });
    };
    requestToken (grant, accountId) {
        let that = this;
        return new Promise((resolve, reject) => {
            that.authApi.post('/access/grant', {
                grant: grant
            }, this.config)
            .then(function (response) {
                that.handleTokenResponse(response, accountId);
                resolve();
            })
            .catch(function (error) {
                console.log(error);
                reject();
            });
        });
    }
    refreshToken () {
        return new Promise((resolve, reject) => {
            let refreshToken = this.authStore.refreshToken();
            if (refreshToken) {
                let that = this;
                this.authApi.post('/access/refresh', {
                    refreshToken: refreshToken
                }, this.config)
                .then(function (response) {
                    if (response) {
                        let accountId = that.authStore.accountId;
                        that.handleTokenResponse(response, accountId);
                        resolve();
                    } else {
                        console.error('NO RESPONSE');
                        reject();
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
            } else {
                console.error('NO REFRESH TOKEN');
            }
        });
    }
    handleTokenResponse (response, accountId) {
        if (response.data) {
            let accessToken = response.data.accessToken;
            let refreshToken = response.data.refreshToken;
            let expire = response.data.expire;
            if (accessToken && refreshToken && expire) {
                this.authStore.saveAuth(accountId, accessToken, refreshToken, expire);
                console.log('UPDATED AUTH DATA');
            } else {
                console.error('MISSING TOKEN DATA');
            }
        } else {
            console.error('NO TOKEN DATA');
        }
    }
    getAccessToken () {
        return new Promise((resolve, reject) => {
            if (this.authStore.accessToken()) {
                if (!this.authStore.isExpired()) {
                    resolve(this.authStore.accessToken())
                } else {
                    this.refreshToken().then(() => {
                        resolve(this.authStore.accessToken())
                    });
                }
            } else {
                reject();
            }
        });
    }
    deleteAuthentication () {
        let that = this;
        return new Promise((resolve) => {
            let accessToken = that.authStore.accessToken();
            that.authStore.removeAuth();
            let orderApi = new HttpHelper(this.loginApi);
            orderApi.delete('/logout/' + accessToken, {})
            .then(() => {
                resolve();
            })
            .catch(function (error) {
                console.error(error);
            });
        });
    };
}
export default AuthController;
