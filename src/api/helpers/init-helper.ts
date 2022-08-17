/* istanbul ignore file */

/**
 * @file {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} init helpers
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */

import {
  MoBrixEngineConfig,
  MoBrixEngineCustomConfig,
  MoBrixEngineCallback,
  MoBrixEngineParser,
  MoBrixEnginePluginParameters,
  MoBrixEngineStore,
  MoBrixEnginePluginInteraction,
} from "mobrix-engine-types";

import { createMoBrixEngineReducer } from "mobrix-engine-tools";
import { fillObject } from "mobrix-utils";

/**
 * Parse {@link https://github.com/CianciarusoCataldo/mobrix-engine MoBrix-engine} plugins
 *
 * @see https://cianciarusocataldo.github.io/mobrix-engine/docs
 *
 * @author Cataldo Cianciaruso <https://github.com/CianciarusoCataldo>
 *
 * @copyright Cataldo Cianciaruso 2022
 */
export const parsePlugins = (config: MoBrixEngineConfig) => {
  let inputConfig = { ...config };

  let enabledPlugins: Record<string, Record<string, any>> = {};
  let interactions: MoBrixEnginePluginInteraction[] = [];
  let designerInteractions: MoBrixEnginePluginInteraction[] = [];
  let middlewares: MoBrixEnginePluginParameters["middlewares"][] = [];
  let formatters: MoBrixEngineCallback[] = [];
  let reduxConfigs: MoBrixEnginePluginParameters["reducer"][] = [];
  let postInitActions: MoBrixEngineParser[] = [];
  let preInitActions: MoBrixEngineParser[] = [];
  let pluginFieldMap: Record<string, string> = {};

  const formatAction =
    (action: MoBrixEngineParser): MoBrixEngineParser =>
    ({ config, store }) => {
      const output = action({ config, store });
      return output || config;
    };

  inputConfig.plugins.forEach((plugin) => {
    try {
      if (plugin.feature) {
        enabledPlugins[plugin.feature] = {};
        const actions = plugin();

        if (actions.field) {
          const additionalField = actions.field(config) || {
            name: null,
            content: {},
          };
          enabledPlugins[plugin.feature] = additionalField.content;

          if (additionalField.name && additionalField.name !== "config") {
            inputConfig[additionalField.name] = additionalField.content;
            pluginFieldMap[plugin.feature] = additionalField.name;
          }
        }

        if (actions.interactions) {
          interactions = interactions.concat(actions.interactions);
        }

        if (actions.designerInteractions) {
          designerInteractions = designerInteractions.concat(
            actions.designerInteractions
          );
        }

        if (actions.middlewares) {
          middlewares = middlewares.concat(actions.middlewares);
        }

        if (actions.reducer) {
          reduxConfigs.push(actions.reducer);
        }

        actions.format && formatters.push(actions.format);

        actions.before && preInitActions.push(formatAction(actions.before));

        actions.after && postInitActions.push(formatAction(actions.after));
      }
    } catch {}
  });

  formatters.forEach((formatter) => {
    inputConfig = formatter(inputConfig);
  });

  interactions.forEach((interaction) => {
    if (enabledPlugins[interaction.plugin]) {
      const result = interaction.effect(
        enabledPlugins[interaction.plugin],
        inputConfig
      );

      enabledPlugins[interaction.plugin] = result;
      if (pluginFieldMap[interaction.plugin]) {
        inputConfig[pluginFieldMap[interaction.plugin]] = result;
      }
    }
  });

  inputConfig.core.designerInteractions =
    inputConfig.core.designerInteractions.concat(designerInteractions);

  return {
    before: (config: MoBrixEngineConfig) => {
      let input = { ...config };

      middlewares.forEach((getMiddlewares) => {
        const result = getMiddlewares(input);
        if (result.legacyMiddlewares) {
          input.core.legacyMiddlewares.push(...result.legacyMiddlewares);
        }
        if (result.middlewares) {
          input.core.middlewares.push(...result.middlewares);
        }
      });

      preInitActions.forEach((preInitAction) => {
        input = preInitAction({ config: input });
      });

      reduxConfigs.forEach((reduxConfigCallback) => {
        const reduxConfig = reduxConfigCallback(input);

        if (reduxConfig.slice && reduxConfig.slice !== "config") {
          inputConfig.core.customize[reduxConfig.slice] =
            fillObject<MoBrixEngineCustomConfig>({
              toFill: inputConfig.core.customize[reduxConfig.slice],
              defaultObj: { state: {}, effects: {} },
            });

          const initialState = reduxConfig.initialState || {};
          const actualState =
            inputConfig.core.preload[reduxConfig.slice] || {};

          inputConfig.core.preload[reduxConfig.slice] = {
            ...initialState,
            ...actualState,
            ...input.core.customize[reduxConfig.slice].state,
          };

          let effects = input.core.customize[reduxConfig.slice].effects;

          if (reduxConfig.effects) {
            effects = { ...effects, ...reduxConfig.effects };
          }

          input.core.reducers[reduxConfig.slice] = createMoBrixEngineReducer({
            initialState: inputConfig.core.preload[reduxConfig.slice],
            effects,
            additionalReducer: reduxConfig.reducer,
          });
        }
      });

      return input;
    },

    after: (config: MoBrixEngineConfig, store: MoBrixEngineStore) => {
      let input = { ...config };

      postInitActions.forEach((postInitAction) => {
        input = postInitAction({ config: input, store });
      });

      return input;
    },
    config: inputConfig,
  };
};

export const formatConfig = (
  config: MoBrixEngineConfig
): MoBrixEngineConfig => {
  const inputConfig = config || {};
  const reduxConfig = inputConfig.core || {};

  const customConfigs = reduxConfig.customize || {};

  return {
    ...config,
    core: {
      designerInteractions: reduxConfig.designerInteractions || [],
      legacyMiddlewares: reduxConfig.legacyMiddlewares || [],
      middlewares: reduxConfig.middlewares || [],
      customize: {
        ...customConfigs,
        config: customConfigs.config || {},
      },
      reducers: reduxConfig.reducers || {},
      preload: reduxConfig.preload || {},
    },
    plugins: inputConfig.plugins || [],
  };
};
