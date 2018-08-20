
import companyJson from "@src/data/company.json";
export default {
    companyGet() {
        const host = window.location.host;
        let choseCompany = {};
        if (/192\.168|localhost|tm\.yeepiao|m\.yeepiao/ig.test(host)) {
            choseCompany = companyJson['YEEPIAO']
        }
        if (/zf\.yeepiao/ig.test(host)) {
            choseCompany = companyJson['ZHONGFU']
        }
        return choseCompany;
    }
}