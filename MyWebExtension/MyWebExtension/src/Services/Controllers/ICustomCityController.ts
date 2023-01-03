import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { serviceName } from "@docsvision/webclient/System/ServiceUtils";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { ICustomCityModel } from "../Models/ICustomCityModel";

export class CustomCityController {
    constructor(private services: $RequestManager) {
    }

    getCityModel(cityId: string): Promise<ICustomCityModel> {
        let url = urlStore.urlResolver.resolveUrl("Get", "CustomCity");
        url = url + "?cityId=" + cityId;
        return this.services.requestManager.get<ICustomCityModel>(url);
    }
}

export type $CustomCityController = { customCityController: CustomCityController };
export const $CustomCityController = serviceName((s: $CustomCityController) => s.customCityController);