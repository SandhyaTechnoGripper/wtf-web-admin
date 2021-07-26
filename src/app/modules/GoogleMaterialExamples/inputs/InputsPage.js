import React from "react";
import { Redirect, Switch } from "react-router-dom";
import ButtonsExamplesPage from "./ButtonsExamplesPage";
import CheckboxesExamplesPage from "./CheckboxesExamplesPage";
import PickersExamplesPage from "./PickersExamplesPage";
import RadioButtonsExamplesPage from "./RadioButtonsExamplesPage";
import SelectsExamplesPage from "./SelectsExamplesPage";
import SwitchesExamplesPage from "./SwitchesExamplesPage";
import TextFieldsExamplesPage from "./TextFieldsExamplesPage";
import TransferListExamplesPage from "./TransferListExamplesPage";
import EquipmentManagement from "./EquipmentManagement";
import AutocompleteExamplesPage from "./AutocompleteExamplesPage";
import { ContentRoute } from "../../../../_metronic/layout";
import TrainerManagement from "./TrainerManagement";

export function InputsPage() {
  return (
    <Switch>
      <Redirect
        exact={true}
        from="/google-material/inputs"
        to="/google-material/inputs/autocomplete"
      />

      <ContentRoute
        path="/google-material/inputs/autocomplete"
        component={AutocompleteExamplesPage}
      />
      <ContentRoute
        path="/google-material/inputs/buttons"
        component={ButtonsExamplesPage}
      />
      <ContentRoute
        path="/google-material/inputs/checkboxes"
        component={CheckboxesExamplesPage}
      />
      <ContentRoute
        path="/google-material/inputs/pickers"
        component={PickersExamplesPage}
      />
      <ContentRoute
        path="/google-material/inputs/radio-buttons"
        component={RadioButtonsExamplesPage}
      />
      <ContentRoute
        path="/google-material/inputs/selects"
        component={SelectsExamplesPage}
      />
      <ContentRoute
        path="/google-material/inputs/switches"
        component={TransferListExamplesPage}
      />
      <ContentRoute
        path="/google-material/inputs/text-fields"
        component={TextFieldsExamplesPage}
      />
      <ContentRoute
        path="/google-material/inputs/transfer-list"
        component={TrainerManagement}
      />

      <ContentRoute
        path="/google-material/inputs/equip"
        component={EquipmentManagement}
      />
    </Switch>
  );
}
