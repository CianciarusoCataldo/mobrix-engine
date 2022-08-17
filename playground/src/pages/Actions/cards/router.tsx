import { goTo, goBack } from "mobrix-engine-plugins";
import { Card } from "mobrix-ui";
import { ActionsButtons } from "./helper";

export const RouterPluginActionsCard = () => {
  const actions = [
    {
      action: goTo("Home"),
      name: "goTo",
    },
    {
      action: goBack(),
      name: "goBack",
    },
  ];

  return (
    <Card
      header={"Router plugin"}
      key="router_plugin"
      dark
      body={
        <div className="flex flex-col items-center">
          <ActionsButtons actions={actions} />
        </div>
      }
    />
  );
};
