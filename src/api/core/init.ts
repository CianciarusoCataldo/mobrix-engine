/**
 * @file {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine system} init file
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import { MoBrixEngineConfig } from "mobrix-engine-types";

import { formatConfig, parsePlugins } from "../helpers/init-helper";
import initStore from "../store/init";

/**
 * Initialize the entire {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine system}, using Config object parameters,
 * and returns a Redux store, providing also the parsed config object
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @param {Config} config Configuration parameters
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const initEngine = (config?: MoBrixEngineConfig) => {
  let inputConfig = formatConfig(config);

  const pluginsOutput = parsePlugins(inputConfig);

  inputConfig = pluginsOutput.config;

  inputConfig = pluginsOutput.before(inputConfig);

  const store = initStore(inputConfig);

  inputConfig = pluginsOutput.after(inputConfig, store);

  return {
    store,
    config: inputConfig,
  };
};
