import {EntityService} from "./EntityService";
import {api, url} from "@/plugins/api";

export class ProjectService extends EntityService {
    static uri = 'project';

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

    static async exportZip(files) {
        return await api(
            this.getUri() + `/export-zip`,
            'POST',
            JSON.stringify({
                files: files
            })
        )
    }
}
