import { createMoBrixEngineSelector } from "mobrix-engine-tools";
import { isInDarkMode, getUIView } from "mobrix-engine-plugins";
import { Card } from "mobrix-ui";
import { SelectorsButtons } from "./helper";

export const UiPluginSelectorsCard = () => {
  const selectorCards = [
    {
      name: "getUiView",
      selector: getUIView,
    },
    {
      selector: createMoBrixEngineSelector(isInDarkMode, (darkMode) => ({
        darkMode,
      })),
      name: "isInDarkMode",
    },
  ];

  return (
    <Card
      key="ui_plugin"
      header={"Ui plugin"}
      dark
      body={
        <div className="flex flex-col items-center">
          <SelectorsButtons selectors={selectorCards} />
        </div>
      }
    />
  );
};
