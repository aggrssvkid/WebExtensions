import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { serviceName } from "@docsvision/webclient/System/ServiceUtils";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { IDailyCityModel } from "../Models/IDailyCityModel";

export class DailyCityController {
    constructor(private services: $RequestManager) {
    }

    getDailyCityModel(cityId: string): Promise<IDailyCityModel> {
        let url = urlStore.urlResolver.resolveUrl("GetDaily", "DailyCity");
        url = url + "?cityId=" + cityId;
        return this.services.requestManager.get<IDailyCityModel>(url);
    }
}

export type $DailyCityController = { dailyCityController: DailyCityController };
export const $DailyCityController = serviceName((s: $DailyCityController) => s.dailyCityController);