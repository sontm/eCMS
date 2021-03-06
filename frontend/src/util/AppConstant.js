const LOCAL_RECENT_VIEWED = "LOCAL_RECENT_VIEWED";
const LOCAL_CART_ADDED = "LOCAL_CART_ADDED";
const LOCAL_JWT_TOKEN = "LOCAL_JWT_TOKEN";
const LOCAL_CSRF_TOKEN = "LOCAL_CSRF_TOKEN";

const CONFIG_PRICE_DIVIDED_RANGE = 5;
const CONFIG_PRICE_ROUNDUP_TO = 10000;

export default class AppConstants  {
    static get LOCAL_RECENT_VIEWED() {
        return LOCAL_RECENT_VIEWED;
    }
    static get LOCAL_CART_ADDED() {
        return LOCAL_CART_ADDED;
    }
    static get LOCAL_JWT_TOKEN() {
        return LOCAL_JWT_TOKEN;
    }
    static get LOCAL_CSRF_TOKEN() {
        return LOCAL_CSRF_TOKEN;
    }
    static get CONFIG_PRICE_DIVIDED_RANGE() {
        return CONFIG_PRICE_DIVIDED_RANGE;
    }
    static get CONFIG_PRICE_ROUNDUP_TO() {
        return CONFIG_PRICE_ROUNDUP_TO;
    }

    static addProductToRecentView(id) {
        let v = localStorage.getItem(LOCAL_RECENT_VIEWED);
        if (!v) {
            v = "";
        }
        if (v.indexOf(":" + id + ":") <= -1) {
            // add if not exist
            v += "" + id + ":";
            localStorage.setItem(LOCAL_RECENT_VIEWED, v);
        }
    }
    static getProductRecentView() {
        let v = localStorage.getItem(LOCAL_RECENT_VIEWED);
        let result = [];
        if (v) {
            let vArr = v.split(":")
            
            vArr.forEach(e => {
                if (e && e != "") {
                    result.push(e);
                }
            });
        }
        return result;
    }
}
