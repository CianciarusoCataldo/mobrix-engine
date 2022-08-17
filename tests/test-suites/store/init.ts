import initStore from "../../../src/api/store/init";

const runTest = () => {
  test("with redux.middleware field defined", () => {
    const middlewareStub = jest.fn();
    initStore({
      core: {
        customize: {},
        middlewares: [middlewareStub],
        legacyMiddlewares: [],
      },
    });
    expect(middlewareStub).toBeCalled;
  });

  test("without customize field inside redux config", () => {
    const middlewareStub = jest.fn();
    initStore({
      core: {
        middlewares: [middlewareStub],
        legacyMiddlewares: [],
      },
    });
    expect(middlewareStub).toBeCalled;
  });

  test("with redux.customize defined", () => {
    initStore({
      core: {
        reducers: {},
        preload: {},
        legacyMiddlewares: [],
        middlewares: [],
        customize: {
          config: {
            test: "test",
          },
        },
      },
    });
  });
};

export default runTest;
