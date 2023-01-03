import { serviceName } from "@docsvision/webclient/System/ServiceUtils";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
var SekretarGroupController = /** @class */ (function () {
    function SekretarGroupController(services) {
        this.services = services;
    }
    SekretarGroupController.prototype.getSekretarGroupModel = function () {
        var url = urlStore.urlResolver.resolveUrl("GetSekretar", "SekretarGroup");
        return this.services.requestManager.get(url);
    };
    return SekretarGroupController;
}());
export { SekretarGroupController };
export var $SekretarGroupController = serviceName(function (s) { return s.sekretarGroupController; });
//# sourceMappingURL=SekretarGroupController.js.map