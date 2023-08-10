import {EntityService} from "./EntityService";
import {api} from "@/plugins/api";

export class FileService extends EntityService {
    static uri = 'files';

    static async upload(file) {
        const formData = new FormData()
        formData.append('files', file)
        return await api(
            this.getUri(),
            'POST',
            formData
        )
    }
}