import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";

export interface ICustomEmployeeDataModel {
    phone: string,
    manager: GenModels.EmployeeDataModel
}