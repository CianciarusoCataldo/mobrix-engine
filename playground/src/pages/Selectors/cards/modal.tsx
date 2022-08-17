import {
  getModalContext,
  getModalType,
  getModalView,
  isModalVisible,
} from "mobrix-engine-plugins";
import { createMoBrixEngineSelector } from "mobrix-engine-tools";

import { Card } from "mobrix-ui";
import { SelectorsButtons } from "./helper";

export const ModalPluginSelectorsCard = () => {
  const selectorCards = [
    {
      selector: getModalView,
      name: "getModalView",
    },
    {
      selector: createMoBrixEngineSelector(getModalType, (type) => ({ type })),
      name: "getModalType",
    },
    {
      selector: createMoBrixEngineSelector(isModalVisible, (isVisible) => ({
        isVisible,
      })),
      name: "isModalVisible",
    },
    {
      selector: getModalContext,
      name: "getModalContext",
    },
  ];

  return (
    <Card
      header={"Modal plugin"}
      key="modal_plugin"
      dark
      body={
        <div className="flex flex-col items-center">
          <SelectorsButtons selectors={selectorCards} />
        </div>
      }
    />
  );
};
