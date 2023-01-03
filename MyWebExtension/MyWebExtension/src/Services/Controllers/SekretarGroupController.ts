import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { serviceName } from "@docsvision/webclient/System/ServiceUtils";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { ISekretarGroupModel } from "../Models/ISekretarGroupModel";

export class SekretarGroupController {
    constructor(private services: $RequestManager) {
    }

    getSekretarGroupModel(): Promise<ISekretarGroupModel> {
        let url = urlStore.urlResolver.resolveUrl("GetSekretar", "SekretarGroup");
        return this.services.requestManager.get<ISekretarGroupModel>(url);
    }
}

export type $SekretarGroupController = { sekretarGroupController: SekretarGroupController };
export const $SekretarGroupController = serviceName((s: $SekretarGroupController) => s.sekretarGroupController);