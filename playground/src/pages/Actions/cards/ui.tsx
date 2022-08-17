import { setDarkMode } from "mobrix-engine-plugins";
import { Card } from "mobrix-ui";
import { ActionsButtons } from "./helper";

export const UiPluginActionsCard = () => {
  const actions = [
    {
      action: setDarkMode(true),
      name: "setDarkMode",
    },
  ];

  return (
    <Card
      header={"Ui plugin"}
      key="ui_plugin"
      dark
      body={
        <div className="flex flex-col items-center">
          <ActionsButtons actions={actions} />
        </div>
      }
    />
  );
};
