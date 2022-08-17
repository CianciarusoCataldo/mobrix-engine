import { changeLanguage } from "mobrix-engine-plugins";
import { Card } from "mobrix-ui";
import { ActionsButtons } from "./helper";

export const LocalizationPluginActionsCard = () => {
  const actions = [
    {
      action: changeLanguage("es"),
      name: "changeLanguage",
    },
  ];

  return (
    <Card
      header={"Localization plugin"}
      key="localization_plugin"
      dark
      body={
        <div className="flex flex-col items-center">
          <ActionsButtons actions={actions} />
        </div>
      }
    />
  );
};
