import {
  getLanguage,
  getLanguages,
  getLocalizationConfig,
} from "mobrix-engine-plugins";
import { createMoBrixEngineSelector } from "mobrix-engine-tools";
import { Card } from "mobrix-ui";
import { SelectorsButtons } from "./helper";

export const LocalizationPluginSelectorsCard = () => {
  const selectorCards = [
    {
      selector: getLocalizationConfig,
      name: "getLocalizationConfig",
    },
    {
      selector: createMoBrixEngineSelector(getLanguages, (langs) => ({
        languages: langs,
      })),
      name: "getLanguages",
    },
    {
      selector: createMoBrixEngineSelector(getLanguage, (lang) => ({
        language: lang,
      })),
      name: "getLanguage",
    },
  ];

  return (
    <Card
      header={"Localization plugin"}
      key="localization_plugin"
      dark
      body={
        <div className="flex flex-col items-center">
          <SelectorsButtons selectors={selectorCards} />
        </div>
      }
    />
  );
};
