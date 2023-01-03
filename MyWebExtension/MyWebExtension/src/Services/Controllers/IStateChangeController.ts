import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { serviceName } from "@docsvision/webclient/System/ServiceUtils";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { IStateChangeModel } from "../Models/IStateChangeModel";

export class StateChangeController {
    constructor(private services: $RequestManager) {
    }

        getStateModel(cardId: string): Promise<IStateChangeModel> {
        let url = urlStore.urlResolver.resolveUrl("StateChange", "StateChange");
        url = url + "?cardId=" + cardId;
        return this.services.requestManager.get<IStateChangeModel>(url);
    }
}

export type $StateChangeController = { stateChangeController: StateChangeController };
export const $StateChangeController = serviceName((s: $StateChangeController) => s.stateChangeController);