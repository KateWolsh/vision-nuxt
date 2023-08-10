// @ts-ignore
import {api} from '~/plugins/api.js'

export class EntityService {
    static uri;

    static getUri() {
        return this.uri;
    }

    static async getAll() {
        return await api(this.getUri())
    }

    static async getOneById(id) {
        return await api(this.getUri() + '/' + id)
    }

}