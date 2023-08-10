import {EntityService} from "./EntityService";
import {api, url} from "@/plugins/api";

export class AuthService extends EntityService {
    static uri = 'auth';

    static async me() {
        return await api(
            this.getUri() + '/me',
        )
    }

    static async login(formData) {
        return await api(
            this.getUri() + '/login',
            'POST',
            JSON.stringify(formData)
        )
    }

}