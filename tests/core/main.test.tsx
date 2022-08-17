import PKG from "../../package.json";

import storeTests from "../test-suites/store/init";

import engineTests from "../test-suites/engine/init";

import pluginIntegrationTest from "../test-suites/plugins/custom-plugins";
import { MoBrixEngineGlobalState } from "mobrix-engine-types";

const MOCK_STATE: MoBrixEngineGlobalState = {
  config: {
    appName: "test-app",
    core: {},
  },
};

describe(`\n        ## ${PKG.name} v${PKG.version} - unit tests ##        \n`, () => {
  describe("\n      Init", () => {
    describe("\n       engine init\n", () => {
      engineTests();
    });
    describe("\n       store init\n", () => {
      storeTests();
    });
  });

  describe("\n\n      Plugins", () => {
    pluginIntegrationTest();
  });
});
