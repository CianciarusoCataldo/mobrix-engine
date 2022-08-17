import { createMoBrixEnginePlugin } from "mobrix-engine-tools";
import { MoBrixEngineConfig, MoBrixEnginePlugin } from "mobrix-engine-types";
import { initEngine } from "../../../src/api/core/init";
import { formatConfig } from "../../../src/api/helpers/init-helper";

const runTests = () => {
  const preInit = jest.fn();
  const postInit = jest.fn();
  const after = jest.fn();
  const before = jest.fn();
  const format = jest.fn();

  const clearMocks = () => {
    [preInit, postInit, after, before, format].forEach((func) =>
      func.mockClear()
    );
  };

  const steps: ReturnType<MoBrixEnginePlugin> = {
    after: ({ config, store }) => {
      after();
      return config;
    },
    before: ({ config }) => {
      before();
      return config;
    },
  };

  let config: MoBrixEngineConfig = formatConfig({});

  describe("\n\n        custom plugins integration\n", () => {
    beforeEach(() => {
      clearMocks();

      config.plugins = [];
      config = formatConfig(config);
    });
    test("every plugin step callback is executed", () => {
      config.plugins?.push(
        createMoBrixEnginePlugin("test-plugin1", () => ({
          field: (config) => ({
            name: "test",
            content: { testField: "test-field" },
          }),
          reducer: (config) => ({
            slice: "test",
            initialState: config.test,
            reducerCases: {},
            reducer: (state, action) => state,
          }),
          ...steps,
        }))
      );

      initEngine(config);

      expect(format).toBeCalled;
      expect(before).toBeCalled;
      expect(preInit).toBeCalled;
      expect(postInit).toBeCalled;
      expect(after).toBeCalled;
    });

    test("if a plugin gives error, is skipped", () => {
      initEngine({
        plugins: [
          createMoBrixEnginePlugin("error-plugin", () => {
            if (config) {
              throw new Error("error into plugin");
            }
            return {
              ...steps,
            };
          }),
        ],
      });

      expect(format).not.toBeCalled;

      expect(before).not.toBeCalled;

      expect(preInit).not.toBeCalled;

      expect(postInit).not.toBeCalled;

      expect(after).not.toBeCalled;
    });
  });
};

export default runTests;
