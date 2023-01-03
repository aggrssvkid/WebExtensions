import { CardKind } from "@docsvision/webclient/BackOffice/CardKind";
import { DirectoryDesignerRow } from "@docsvision/webclient/BackOffice/DirectoryDesignerRow";
import { Employee } from "@docsvision/webclient/BackOffice/Employee";
import { MultipleEmployees } from "@docsvision/webclient/BackOffice/MultipleEmployees";
import { Numerator } from "@docsvision/webclient/BackOffice/Numerator";
import { MessageBox } from "@docsvision/webclient/Helpers/MessageBox/MessageBox";
import { EventHelper } from "@docsvision/webclient/Legacy/Utils";
import { CustomButton } from "@docsvision/webclient/Platform/CustomButton";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { NumberControl } from "@docsvision/webclient/Platform/Number";
import { SavingButtons } from "@docsvision/webclient/Platform/SavingButtons";
import { TextArea } from "@docsvision/webclient/Platform/TextArea";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { BasicApiEvent } from "@docsvision/webclient/System/ApiEvent";
import { CancelableEventArgs } from "@docsvision/webclient/System/CancelableEventArgs";
import { ICardSavingEventArgs } from "@docsvision/webclient/System/ICardSavingEventArgs";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";
import { Layout } from "@docsvision/webclient/System/Layout";
import { layoutManager } from "@docsvision/webclient/System/LayoutManager";
import { SimpleEvent } from "@docsvision/webclient/System/SimpleEvent";
import { func } from "prop-types";
import { $CustomEmployeeController } from "../Services/Controllers/CustomEmployeeController";
import { $CustomCityController } from "../Services/Controllers/ICustomCityController";
import { $StateChangeController } from "../Services/Controllers/IStateChangeController";
import { $SekretarGroupController } from "../Services/Controllers/SekretarGroupController";


/*
 ********************************* ОБРАБОТЧИКИ ДЛЯ КАРТОЧКИ "НА РЕДАКТИРОВАНИЕ"*************************
 */

export async function findNumDays(sender: DateTimePicker) {
    let layout = sender.layout;
    let daysControl = layout.controls.tryGet<NumberControl>("missionDays");
    let dateStartControl = layout.controls.tryGet<DateTimePicker>("dateStart");
    let dateEndControl = layout.controls.tryGet<DateTimePicker>("dateEnd");

    if (dateStartControl == null || dateEndControl == null) { return; }
    if (dateStartControl.hasValue() == false || dateEndControl.hasValue() == false) { return; }

    let numDays = Math.ceil((dateEndControl.params.value.getTime() - dateStartControl.params.value.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (numDays < 0) {
        daysControl.params.value = null;
        alert("Kol-vo dney menshe zero. Please try again.")
        return;
    }
    daysControl.params.value = numDays;
}

//проверка перед сохранением карточки



//Заполняем шефа и телефон

export async function customEmployeeChanged(sender: Employee) {
    let layout = sender.layout;

    let chiefControl = layout.controls.tryGet<Employee>("chief");
    let travelerControl = layout.controls.tryGet<Employee>("traveler");
    let phoneControl = layout.controls.tryGet<TextBox>("phone");

    if (chiefControl == null || travelerControl == null || phoneControl == null) { return; }
    if (sender.hasValue() == false) {
        phoneControl.params.value = null;
        chiefControl.params.value = null;
        return;
    }

    let service = sender.layout.getService($CustomEmployeeController);
    if (service == null) {
        alert("service null");
        return;
    }
    const response = await service.getCustomEmployeeModel(sender.params.value.id);
    if (response == null) {
        alert("Response null");
        return;
    }
    phoneControl.params.value = response.phone;
    chiefControl.params.value = response.manager;
}

// Получаем сотрудников из группы секретарь
export async function groupSekretarActivated(sender: Employee) {
    let layout = sender.layout;
    alert("Its work!");
    let oformiteliControl = layout.controls.tryGet<MultipleEmployees>("oformiteli");
    if (oformiteliControl == null) { return; }


    let service = sender.layout.getService($SekretarGroupController);
    if (service == null) {
        alert("service null");
        return;
    }
    const response = await service.getSekretarGroupModel();
    if (response == null) {
        alert("response null");
        return;
    }
    if (response.employees.length == 0) {
        oformiteliControl.params.value = null;
        alert("Netu sotrudnikov");
        return;
    }
    for (let i = 0; i < response.employees.length; i++) {
        oformiteliControl.params.value.push(response.employees[i]);
    }
}

// Заполняем Сумму суточных

export async function getCityDaily(sender: DirectoryDesignerRow) {
    let layout = sender.layout;

    let cityControl = layout.controls.tryGet<DirectoryDesignerRow>("city");
    let numDaysControl = layout.controls.tryGet<NumberControl>("missionDays");
    let dailyControl = layout.controls.tryGet<NumberControl>("dailyAmount");
    if (cityControl == null || numDaysControl == null || dailyControl == null) {
        alert("NULL");
        return;
    }
    if (numDaysControl.hasValue() == false) {
        alert("Ne ukazano missionDays");
        return;
    }

    if (sender.params.value.id == null || sender.params.value.id.length == 0) {
        alert("Netu id u stroki");
        return;
    }

    let service = sender.layout.getService($CustomCityController);
    if (service == null) {
        alert("service ne poluchen!")
        return;
    }
    const response = await service.getCityModel(sender.params.value.id);
    if (response == null) {
        alert("response null");
        return;
    }
    dailyControl.params.value = numDaysControl.params.value * response.cost;
}

export async function cardSaving(sender: SavingButtons, args: CancelableEventArgs<ICardSavingEventArgs>) 
{    let layout = sender.layout;

    let nameControl = layout.controls.tryGet<TextBox>("dname");
    let numberControl = layout.controls.tryGet<Numerator>("numOf");
    if (numberControl == null || nameControl == null)
        return;

    if (numberControl.hasValue() == false || nameControl.hasValue() == false)
        args.cancel();
    else
        args.accept();
}




/*****************************************Карточка на Чтение************************************/

// Меняем состояние карточки

export async function tryStateChange(sender: CustomButton) {
    let layout = sender.layout;

    let service = layout.getService($StateChangeController);
    if (!service) {
        alert("No service for u!");
        return;
    }

    let model = await service.getStateModel(layout.cardInfo.id);
    if (model == null) {
        alert("No service!");
        return;
    }
    if (model.name == null || model.name.length == 0 || model.name != "Na_soglasovanii") {
        return;
    }
    layout.reloadFromServer();
    alert("pereshod" + model.name);
}


// Краткая инфо по карте

export async function getShortCardInfo(sender: CustomButton) {
    let layout = sender.layout;
    alert("LOl");
    let numControl = layout.controls.tryGet<Numerator>("numOf");
    let dateStartControl = layout.controls.tryGet<DateTimePicker>("dateStart");
    let dateEndControl = layout.controls.tryGet<DateTimePicker>("dateEnd");
    let createControl = layout.controls.tryGet<DateTimePicker>("creationDate")
    let whyTravelControl = layout.controls.tryGet<TextArea>("whyTravel");
    if (numControl == null || dateStartControl == null || dateEndControl == null || createControl == null || whyTravelControl == null) {
        alert("Gde-to null");
        return;
    }
    let message = "Short info{0}Creationdate {1}Start Misiion Date {2} End MIssion Date {3}nWhy go: {4}"
        .format(
            (numControl.hasValue() ? numControl.params.value.number : ""),
            (dateStartControl.hasValue() ? createControl.params.value.toLocaleDateString() : ""),
            (dateStartControl.hasValue() ? dateStartControl.params.value.toLocaleDateString() : ""),
            (dateEndControl.hasValue() ? dateEndControl.params.value.toLocaleDateString() : ""),
            (whyTravelControl.hasValue() ? whyTravelControl.params.value : "")
        );
    alert(message);
}