import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

const http = axios.create({
    baseURL: BASE_URL,
    // timeout: 1000,
    responseType: 'json'
})

const getHeaders = (isSecured) => {
    let options = {
        'Content-Type': 'application/json'
    }
    if (isSecured) {
        options['Authorization'] = localStorage.getItem('token')
    }
    return options
}

const GET = (url, isSecured = false, params = {}) => {
    return new Promise(function (resolve, reject) {
        // http.get(url, {
        //     headers: getHeaders(),
        //     params
        // })
        //     .then(function (response) {
        //         resolve(response);
        //     })
        //     .catch(function (err) {
        //         reject(err);
        //     })
        return http.get(url, {
            headers: getHeaders(isSecured),
            params
        })
    })
}

const POST = (url, data, isSecured = false, params = {}) => {
    return http.post(url, data, {
        headers: getHeaders(isSecured),
        params
    })
}

const PUT = (url, isSecured = false, params = {}) => {
    return http.put(url, data, {
        headers: getHeaders(isSecured),
        params
    })
}

const DELETE = (url, isSecured = false, params = {}) => {
    return http.delete(url, {
        headers: getHeaders(isSecured),
        params
    })
}

const UPLOAD = (method, url, data, files = []) => {
    const xhr = new XMLHttpRequest();
    const formData = new formData();
    // data preparation
    // add file data in formData
    if (files.length) {
        // console.log('files is: ', files)
        files.forEach((file, index) => {
            // for multiple files
            formData.append('image', file, file.name || 'image')
            // for single file
            // formData.append('image', files[0], files[0].name) 
        })
    }

    // add textual data in formData
    for (let key in data) {
        formData.append(key, data[key]);
    }
    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = () => {
            console.log('xhr.ready state: ', xhr.readyState)
            if (xhr.readyState === 4) {
                console.log('req res cycle completed')
                if (xhr.status === 200) {
                    // console.log('success in xhr', xhr.response)
                    resolve(xhr.response)
                }
                else {
                    // console.log('failure in http call: ', xhr.response)
                    reject(xhr.response)
                }
            }
        }
    })

    xhr.open(method, `${BASE_URL}${url}?token=${localStorage.getItem('token')}`, true);
    xhr.send(formData);
}

export const httpClient = {
    GET,
    POST,
    PUT,
    DELETE,
    UPLOAD
}