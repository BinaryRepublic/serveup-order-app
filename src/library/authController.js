import axios from 'axios';
import AuthStore from './authStore';
import HttpHelper from './httpHelper';


class AuthController {
    constructor (requestToken = false, realmHelper) {
        this.authApi = axios.create({
            baseURL: 'http://138.68.71.39:2200'
        });
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
            let orderApi = new HttpHelper('http://138.68.71.39:3200');
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
}
export default AuthController;
