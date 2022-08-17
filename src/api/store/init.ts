/**
 * @file internal {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} store init
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import {
  MoBrixEngineConfig,
  MoBrixEngineReducer,
  MoBrixEngineGlobalState,
} from "mobrix-engine-types";

import { engineInitCompleted } from "mobrix-engine-tools";

/**
 * Initialize and returns a Redux store, using {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} config parameters
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @param {MoBrixEngineConfig} config Configuration parameters
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
const initStore = (config: MoBrixEngineConfig) => {
  const reduxConfig: MoBrixEngineConfig["core"] = config.core;

  let middleware = reduxConfig.legacyMiddlewares;

  reduxConfig.middlewares.forEach((additionalMiddleware) => {
    middleware.push((store) => (next) => (action) => {
      additionalMiddleware(action, store);
      let result = next(action);

      return result;
    });
  });

  const customConfig = (reduxConfig.customize || { config: {} }).config || {};

  const preloadedState: MoBrixEngineGlobalState = {
    config: {
      appName: config.appName || "",
      ...customConfig,
    },
    ...config.core.preload,
  };

  const internalReducers: Record<string, MoBrixEngineReducer<any>> = {
    config: (state = preloadedState.config) => {
      return state;
    },
    ...config.core.reducers,
  };

  const store = configureStore({
    reducer: combineReducers(internalReducers),
    preloadedState,
    middleware,
    devTools: process.env.NODE_ENV === "development",
  });

  store.dispatch(engineInitCompleted(preloadedState.config));

  return store;
};

export default initStore;
