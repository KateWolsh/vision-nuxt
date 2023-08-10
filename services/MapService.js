import {EntityService} from "./EntityService";
import {api, url} from "@/plugins/api";

export class MapService extends EntityService {
    static uri = 'map';

    static async create(formData) {
        return await api(
            this.getUri(),
            'POST',
            JSON.stringify(formData)
        )
    }

    static async update(id, formData) {
        return await api(
            this.getUri() + `/${id}`,
            'PUT',
            JSON.stringify(formData)
        )
    }
}
