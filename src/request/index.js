const axios = require('axios').default;
const qs = require('qs');

class $ {
    /**
     *
     * Get Search Query
     * @static
     * @param {string} [URL=""]
     * @param {*} [params={}]
     * @param {*} [headers={}]
     * @returns
     * @memberof Request
     */
    async get(URL = "", params = {}, headers = {}) {
        URL = this.baseURL + URL + "?" + qs.stringify(params);
        this.access_token &&
            (headers = { Authorization: "Bearer " + this.access_token ,...headers, });
        try {
            const { data } = await axios.get(URL, { headers });
            return { data };
        } catch (error) {
            return { error: this.__formatError(error) };
        }
    }
    /**
     *
     * Post JSON
     * @static
     * @param {string} [URL=""]
     * @param {*} [params={}]
     * @param {*} [headers={}]
     * @returns
     * @memberof Request
     */
    async post(URL = "", params = {}, headers = {}) {
        URL = this.baseURL + URL;
        this.access_token &&
            (headers = { Authorization: "Bearer " + this.access_token ,...headers, });

        const body = params;
        try {
            const { data } = await axios.post(URL, body, { headers });
            return { data };
        } catch (error) {
            return { error: this.__formatError(error) };
        }
    }
    /**
     *
     * Upload file with multipart/form
     * @static
     * @param {string} [URL=""]
     * @param {*} [params={}]
     * @param {*} [headers={}]
     * @returns
     * @memberof Request
     */
    async upload(URL = "", params = {}, headers = {}) {
        URL = this.baseURL + URL;
        this.access_token &&
            (headers = { Authorization: "Bearer " + this.access_token ,...headers, });

        const body = this.___jsonToFormData(params);
        try {
            const { data } = await axios.post(URL, body, { headers });
            return { data };
        } catch (error) {
            return { error: this.__formatError(error) };
        }
    }
    ___jsonToFormData(data) {
        const formData = new FormData();
        Object.keys(data).forEach(key=>{
            let elem = data[key];
            if(typeof elem == "string" || typeof elem == "number" || typeof elem == "boolean")
                return formData.append(`${key}`, data[key]);
            if(Array.isArray(elem))
                return elem.forEach(item=>{
                    formData.append(`${key}[]`,item);
                })
            if(typeof elem == "object")
                return formData.append(key,data[key]);
            console.log(`${key} is missing`,typeof elem,elem);
        })
        return formData;
    }
    __formatError = (error) => {
        if (error.response)
            return error.response.data;
        return error;
    }
}

const Request = new $();

module.exports = { Request };