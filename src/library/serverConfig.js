import AuthStore from "./authStore";
import AuthController from "./authController";

class serverConfig {
    constructor () {
        // -- init ports
        // -- should be dependent on ENV-Variables later!
        // PROD
        let authApiPort = 2000;
        let orderApiPort = 3000;
        let adminApiPort = 4000;
        let orderWorkerPort = 9000;
        // STAGE
        if (window.location.port == 81) {
            authApiPort = 2100;
            orderApiPort = 3100;
            adminApiPort = 4100;
            orderWorkerPort = 9100;
        }
        // DEV
        else if (window.location.port == 82 || window.location.port == 3000) {
            authApiPort = 2200;
            orderApiPort = 3200;
            adminApiPort = 4200;
            orderWorkerPort = 9200;
        }
        // let serverUrl = 'http://138.68.71.39';
        let serverUrl = 'http://172.17.0.1';
        this.authApi = serverUrl + ':' + authApiPort;
        this.orderApi = serverUrl + ':' + orderApiPort;
        this.adminApi = serverUrl + ':' + adminApiPort;
        this.orderWorker = serverUrl + ':' + orderWorkerPort;
    }
}
export default serverConfig;