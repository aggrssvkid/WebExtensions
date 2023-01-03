import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { serviceName } from "@docsvision/webclient/System/ServiceUtils";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { ICustomEmployeeDataModel } from "../Models/ICustomEmployeeDataModel";

export class CustomEmployeeController {
    constructor(private services: $RequestManager) {
    }

        getCustomEmployeeModel(employeeId: string): Promise<ICustomEmployeeDataModel> {
        let url = urlStore.urlResolver.resolveUrl("Get", "CustomEmployee");
        url = url + "?employeeId=" + employeeId;
        return this.services.requestManager.get<ICustomEmployeeDataModel>(url);
    }
}

export type $CustomEmployeeController = { customEmployeeController: CustomEmployeeController };
export const $CustomEmployeeController = serviceName((s: $CustomEmployeeController) => s.customEmployeeController);