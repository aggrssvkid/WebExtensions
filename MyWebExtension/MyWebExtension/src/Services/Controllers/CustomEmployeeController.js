import { serviceName } from "@docsvision/webclient/System/ServiceUtils";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
var CustomEmployeeController = /** @class */ (function () {
    function CustomEmployeeController(services) {
        this.services = services;
    }
    CustomEmployeeController.prototype.getCustomEmployeeModel = function (employeeId) {
        var url = urlStore.urlResolver.resolveUrl("Get", "CustomEmployee");
        url = url + "?employeeId=" + employeeId;
        return this.services.requestManager.get(url);
    };
    return CustomEmployeeController;
}());
export { CustomEmployeeController };
export var $CustomEmployeeController = serviceName(function (s) { return s.customEmployeeController; });
//# sourceMappingURL=CustomEmployeeController.js.map