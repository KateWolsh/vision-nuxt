import {cookier} from "@/plugins/cookier.min";

const url = process.env.backendUrl

async function api(route = '/',
                   method = 'GET',
                   params = null,
                   headers = {},
                   host = url + 'api/') {
    let queryString = ''

    if (!!params && method === 'GET' && Object.keys(params).length) {
        for (const key in params) {
            queryString += `&${key}=${params[key]}`
        }
        if (queryString.length) {
            queryString = `?${queryString.substring(1)}`
        }
    }

    let auth = {}

    if (process.client) {
        const token = cookier('token')
        auth = token && token.value ? {
            'Authorization': `Bearer ${token.value}`
        } : {}
    }

    try {
        let defaultHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (method !== 'GET' && params instanceof FormData) {
            delete defaultHeaders['Content-Type']
        }

        let res = await fetch(`${host}${route}${queryString}`, {
            method: method,
            headers: {
                ...defaultHeaders,
                ...auth,
                ...headers,
            },
            body: method !== 'GET' ? params : null
        })
        const data = await res.json()
        return {data, res}
    } catch (e) {
        if (process.client) {
            // this.$noty.error('Ошибка получения данных')
        }
        return {error: e}
    }
}

export {api, url}
