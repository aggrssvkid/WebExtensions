import * as SomeEventHandlers from "./EventHandlers/SomeEventHandlers";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { Service } from "@docsvision/webclient/System/Service";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { $CustomEmployeeController, CustomEmployeeController } from "./Services/Controllers/CustomEmployeeController";
import { $SekretarGroupController, SekretarGroupController } from "./Services/Controllers/SekretarGroupController";
import { $CustomCityController, CustomCityController } from "./Services/Controllers/ICustomCityController";
import { $StateChangeController, StateChangeController } from "./Services/Controllers/IStateChangeController";


// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.

// Регистрация расширения позволяет корректно установить все
// обработчики событий, сервисы и прочие сущности web-приложения.
extensionManager.registerExtension({
    name: "TemplateFrontExtension",
    version: "5.5.16",
    globalEventHandlers: [SomeEventHandlers],
    layoutServices: [
        Service.fromFactory($CustomEmployeeController, (services: $RequestManager) => new CustomEmployeeController(services)),
        Service.fromFactory($SekretarGroupController, (services: $RequestManager) => new SekretarGroupController(services)),
        Service.fromFactory($CustomCityController, (services: $RequestManager) => new CustomCityController(services)),
        Service.fromFactory($StateChangeController, (services: $RequestManager) => new StateChangeController(services))
    ]
})

