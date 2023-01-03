import { serviceName } from "@docsvision/webclient/System/ServiceUtils";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
var DailyCityController = /** @class */ (function () {
    function DailyCityController(services) {
        this.services = services;
    }
    DailyCityController.prototype.getDailyCityModel = function (cityId) {
        var url = urlStore.urlResolver.resolveUrl("GetDaily", "DailyCity");
        url = url + "?cityId=" + cityId;
        return this.services.requestManager.get(url);
    };
    return DailyCityController;
}());
export { DailyCityController };
export var $DailyCityController = serviceName(function (s) { return s.dailyCityController; });
//# sourceMappingURL=AviaCostController.js.map