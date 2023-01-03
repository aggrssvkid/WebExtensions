import { serviceName } from "@docsvision/webclient/System/ServiceUtils";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
var StateChangeController = /** @class */ (function () {
    function StateChangeController(services) {
        this.services = services;
    }
    StateChangeController.prototype.getStateModel = function (cardId) {
        var url = urlStore.urlResolver.resolveUrl("StateChange", "StateChange");
        url = url + "?cardId=" + cardId;
        return this.services.requestManager.get(url);
    };
    return StateChangeController;
}());
export { StateChangeController };
export var $StateChangeController = serviceName(function (s) { return s.stateChangeController; });
//# sourceMappingURL=IStateChangeController.js.map