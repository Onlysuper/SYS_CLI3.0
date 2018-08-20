import { retry } from "async";
import { getAgentSettle } from ".";
import companyFn from "@src/common/company.js";
let company = companyFn.companyGet();
const ipHost = {
    localHost: "//192.168.1.130:8099/tm",
    testHost: company.id == 'yp' ? "//tm.yeepiao.com" : "//zf.yeepiao.com",
    productionHost: company.id == 'yp' ? "//m.yeepiao.com" : "//zf.yeepiao.com"
}

function getUrl() {
    switch (process.env.NODE_ENV) {
        case "development":
            return location.protocol + ipHost.localHost;
        case "productionTest":
            return location.protocol + ipHost.testHost;
        case "production":
            return location.protocol + ipHost.productionHost;
    }
}

function getMerIp() {
    switch (process.env.NODE_ENV) {
        case "development":
            return location.protocol + ipHost.localHost + "/zf-front-transfer";
        case "productionTest":
            return location.protocol + ipHost.testHost + "/zf-front-transfer";
        case "production":
            return location.protocol + ipHost.productionHost + "/zf-front-transfer";
    }
}
function getImgUrl() {
    switch (process.env.NODE_ENV) {
        case "development":
            return "http://tf.yeepiao.com";
            break;
        case "productionTest":
            return "http://tf.yeepiao.com";
            break;
        case "production":
            return "https://f.yeepiao.com";
            break;
        default:
            return ""
    }
}
export default {
    oaIp: getUrl(),
    imgIP: getImgUrl(),
    merIp: getMerIp()
}