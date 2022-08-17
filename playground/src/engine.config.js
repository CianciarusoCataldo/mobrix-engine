import {
  epicsPlugin,
  localizationPlugin,
  modalPlugin,
  routerPlugin,
  themerPlugin,
  uiPlugin,
  urlCheckerPlugin,
} from "mobrix-engine-plugins";

const engineConfig = {
  appName: "MoBrix-engine",
  debug: false,
  plugins: [
    localizationPlugin,
    epicsPlugin,
    routerPlugin,
    modalPlugin,
    themerPlugin,
    uiPlugin,
    urlCheckerPlugin,
  ],
  ui: { darkMode: true, drawer: true },
  urlChecker: {
    queryParameters: {
      test: ({ config }) => {
        alert("test param");
        return config;
      },
    },
    after: ["test"],
  },
  modal: {
    onModalOpen: [() => console.log("opened")],
  },
  router: {
    basename: "/mobrix-engine",
    homePage: "Home",
    routes: {
      Home: "/",
      Selectors: "/selectors",
      Actions: "/actions",
    },
  },
  localization: {
    fallbackLanguage: "en",
    supportedLanguages: ["en", "it", "es", "fr", "de"],
    namespaces: ["home", "common"],
    defaultNamespace: "home",
    loadPath: "/mobrix-engine/locales/{{lng}}/{{ns}}.json",
    titlesNamespace: "page-titles",
  },
  theme: {
    dark: {
      bodyColor: "linear-gradient(to right, #3c4a5f, #4d5f7d)",
    },
    default: {
      bodyColor: "linear-gradient(to right, #eaebec, #cccdcf)",
    },
  },
};

export default engineConfig;
