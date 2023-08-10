import {EntityService} from "./EntityService";
import {api, url} from "@/plugins/api";

export class MainPageService extends EntityService {
    static uri = 'main';

    static async create(formData) {
        // formData.teamOtherCount = +formData.teamOtherCount
        return await api(
            this.getUri(),
            'POST',
            JSON.stringify(formData)
        )
    }

    static async update(id, formData) {
        // formData.teamOtherCount = +formData.teamOtherCount
        return await api(
            this.getUri() + `/${id}`,
            'PUT',
            JSON.stringify(formData)
        )
    }
}
