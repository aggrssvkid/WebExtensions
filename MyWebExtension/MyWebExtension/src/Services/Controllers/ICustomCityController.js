import { serviceName } from "@docsvision/webclient/System/ServiceUtils";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
var CustomCityController = /** @class */ (function () {
    function CustomCityController(services) {
        this.services = services;
    }
    CustomCityController.prototype.getCityModel = function (cityId) {
        var url = urlStore.urlResolver.resolveUrl("Get", "CustomCity");
        url = url + "?cityId=" + cityId;
        return this.services.requestManager.get(url);
    };
    return CustomCityController;
}());
export { CustomCityController };
export var $CustomCityController = serviceName(function (s) { return s.customCityController; });
//# sourceMappingURL=ICustomCityController.js.map