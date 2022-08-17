import { initEngine } from "../../../src/api/core/init";

const runTest = () => {
  test("without config parameter", () => {
    initEngine();
  });
  test("with empty config", () => {
    initEngine({});
  });
  test("with defined config", () => {
    initEngine({
      core: { reducers: {}, preload: {} },
    });
  });
};

export default runTest;
