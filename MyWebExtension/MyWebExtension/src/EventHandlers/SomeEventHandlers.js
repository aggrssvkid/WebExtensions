var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { $CustomEmployeeController } from "../Services/Controllers/CustomEmployeeController";
import { $CustomCityController } from "../Services/Controllers/ICustomCityController";
import { $StateChangeController } from "../Services/Controllers/IStateChangeController";
import { $SekretarGroupController } from "../Services/Controllers/SekretarGroupController";
/*
 ********************************* ОБРАБОТЧИКИ ДЛЯ КАРТОЧКИ "НА РЕДАКТИРОВАНИЕ"*************************
 */
export function findNumDays(sender) {
    return __awaiter(this, void 0, void 0, function () {
        var layout, daysControl, dateStartControl, dateEndControl, numDays;
        return __generator(this, function (_a) {
            layout = sender.layout;
            daysControl = layout.controls.tryGet("missionDays");
            dateStartControl = layout.controls.tryGet("dateStart");
            dateEndControl = layout.controls.tryGet("dateEnd");
            if (dateStartControl == null || dateEndControl == null) {
                return [2 /*return*/];
            }
            if (dateStartControl.hasValue() == false || dateEndControl.hasValue() == false) {
                return [2 /*return*/];
            }
            numDays = Math.ceil((dateEndControl.params.value.getTime() - dateStartControl.params.value.getTime()) / (1000 * 60 * 60 * 24)) + 1;
            if (numDays < 0) {
                daysControl.params.value = null;
                alert("Kol-vo dney menshe zero. Please try again.");
                return [2 /*return*/];
            }
            daysControl.params.value = numDays;
            return [2 /*return*/];
        });
    });
}
//проверка перед сохранением карточки
//Заполняем шефа и телефон
export function customEmployeeChanged(sender) {
    return __awaiter(this, void 0, void 0, function () {
        var layout, chiefControl, travelerControl, phoneControl, service, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    layout = sender.layout;
                    chiefControl = layout.controls.tryGet("chief");
                    travelerControl = layout.controls.tryGet("traveler");
                    phoneControl = layout.controls.tryGet("phone");
                    if (chiefControl == null || travelerControl == null || phoneControl == null) {
                        return [2 /*return*/];
                    }
                    if (sender.hasValue() == false) {
                        phoneControl.params.value = null;
                        chiefControl.params.value = null;
                        return [2 /*return*/];
                    }
                    service = sender.layout.getService($CustomEmployeeController);
                    if (service == null) {
                        alert("service null");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, service.getCustomEmployeeModel(sender.params.value.id)];
                case 1:
                    response = _a.sent();
                    if (response == null) {
                        alert("Response null");
                        return [2 /*return*/];
                    }
                    phoneControl.params.value = response.phone;
                    chiefControl.params.value = response.manager;
                    return [2 /*return*/];
            }
        });
    });
}
// Получаем сотрудников из группы секретарь
export function groupSekretarActivated(sender) {
    return __awaiter(this, void 0, void 0, function () {
        var layout, oformiteliControl, service, response, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    layout = sender.layout;
                    alert("Its work!");
                    oformiteliControl = layout.controls.tryGet("oformiteli");
                    if (oformiteliControl == null) {
                        return [2 /*return*/];
                    }
                    service = sender.layout.getService($SekretarGroupController);
                    if (service == null) {
                        alert("service null");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, service.getSekretarGroupModel()];
                case 1:
                    response = _a.sent();
                    if (response == null) {
                        alert("response null");
                        return [2 /*return*/];
                    }
                    if (response.employees.length == 0) {
                        oformiteliControl.params.value = null;
                        alert("Netu sotrudnikov");
                        return [2 /*return*/];
                    }
                    for (i = 0; i < response.employees.length; i++) {
                        oformiteliControl.params.value.push(response.employees[i]);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Заполняем Сумму суточных
export function getCityDaily(sender) {
    return __awaiter(this, void 0, void 0, function () {
        var layout, cityControl, numDaysControl, dailyControl, service, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    layout = sender.layout;
                    cityControl = layout.controls.tryGet("city");
                    numDaysControl = layout.controls.tryGet("missionDays");
                    dailyControl = layout.controls.tryGet("dailyAmount");
                    if (cityControl == null || numDaysControl == null || dailyControl == null) {
                        alert("NULL");
                        return [2 /*return*/];
                    }
                    if (numDaysControl.hasValue() == false) {
                        alert("Ne ukazano missionDays");
                        return [2 /*return*/];
                    }
                    if (sender.params.value.id == null || sender.params.value.id.length == 0) {
                        alert("Netu id u stroki");
                        return [2 /*return*/];
                    }
                    service = sender.layout.getService($CustomCityController);
                    if (service == null) {
                        alert("service ne poluchen!");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, service.getCityModel(sender.params.value.id)];
                case 1:
                    response = _a.sent();
                    if (response == null) {
                        alert("response null");
                        return [2 /*return*/];
                    }
                    dailyControl.params.value = numDaysControl.params.value * response.cost;
                    return [2 /*return*/];
            }
        });
    });
}
export function cardSaving(sender, args) {
    return __awaiter(this, void 0, void 0, function () {
        var layout, nameControl, numberControl;
        return __generator(this, function (_a) {
            layout = sender.layout;
            nameControl = layout.controls.tryGet("dname");
            numberControl = layout.controls.tryGet("numOf");
            if (numberControl == null || nameControl == null)
                return [2 /*return*/];
            if (numberControl.hasValue() == false || nameControl.hasValue() == false)
                args.cancel();
            else
                args.accept();
            return [2 /*return*/];
        });
    });
}
/*****************************************Карточка на Чтение************************************/
// Меняем состояние карточки
export function tryStateChange(sender) {
    return __awaiter(this, void 0, void 0, function () {
        var layout, service, model;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    layout = sender.layout;
                    service = layout.getService($StateChangeController);
                    if (!service) {
                        alert("No service for u!");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, service.getStateModel(layout.cardInfo.id)];
                case 1:
                    model = _a.sent();
                    if (model == null) {
                        alert("No service!");
                        return [2 /*return*/];
                    }
                    if (model.name == null || model.name.length == 0 || model.name != "Na_soglasovanii") {
                        return [2 /*return*/];
                    }
                    layout.reloadFromServer();
                    alert("pereshod" + model.name);
                    return [2 /*return*/];
            }
        });
    });
}
// Краткая инфо по карте
export function getShortCardInfo(sender) {
    return __awaiter(this, void 0, void 0, function () {
        var layout, numControl, dateStartControl, dateEndControl, createControl, whyTravelControl, message;
        return __generator(this, function (_a) {
            layout = sender.layout;
            alert("LOl");
            numControl = layout.controls.tryGet("numOf");
            dateStartControl = layout.controls.tryGet("dateStart");
            dateEndControl = layout.controls.tryGet("dateEnd");
            createControl = layout.controls.tryGet("creationDate");
            whyTravelControl = layout.controls.tryGet("whyTravel");
            if (numControl == null || dateStartControl == null || dateEndControl == null || createControl == null || whyTravelControl == null) {
                alert("Gde-to null");
                return [2 /*return*/];
            }
            message = "Short info{0}Creationdate {1}Start Misiion Date {2} End MIssion Date {3}nWhy go: {4}"
                .format((numControl.hasValue() ? numControl.params.value.number : ""), (dateStartControl.hasValue() ? createControl.params.value.toLocaleDateString() : ""), (dateStartControl.hasValue() ? dateStartControl.params.value.toLocaleDateString() : ""), (dateEndControl.hasValue() ? dateEndControl.params.value.toLocaleDateString() : ""), (whyTravelControl.hasValue() ? whyTravelControl.params.value : ""));
            alert(message);
            return [2 /*return*/];
        });
    });
}
//# sourceMappingURL=SomeEventHandlers.js.map