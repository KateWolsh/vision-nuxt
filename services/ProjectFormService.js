import {EntityService} from "./EntityService";
import {api, url} from "@/plugins/api";

export class ProjectFormService extends EntityService {
    static uri = 'form';

    static async submit(data) {
        return await api(
            this.getUri(),
            'POST',
            JSON.stringify(data)
        )
    }

}