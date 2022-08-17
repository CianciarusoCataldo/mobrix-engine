import "assets/styles";

if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
  navigator.serviceWorker
    .register("./serviceWorker.js", { scope: "/mobrix-engine/" })
    .then(
      function () {
        console.log("Service worker registration succeeded");
      },
      /*catch*/ function () {
        console.log("Service worker registration failed");
      }
    );
} else {
  console.log("Service workers are not supported.");
}

let MoBrixApp: any = null;
let engineParams: any = null;

import("mobrix-engine-preview").then(({ initEngine }) => {
  import("./engine.config").then(({ default: engineConfig }) => {
    engineParams = initEngine(engineConfig);
  });
});

import("mobrix-designer").then(({ initMoBrixDesigner }) => {
  import("./app.config").then(({ default: creatorConfig }) => {
    MoBrixApp = (args: any) =>
      initMoBrixDesigner({
        ...args,
        creatorConfig: creatorConfig,
      }).App;
  });
});

const check = () => {
  if (engineParams != null && MoBrixApp != null) {
    import("react-dom").then(({ render }) => {
      render(
        MoBrixApp({
          store: engineParams.store,
          engineConfig: engineParams.config,
        }),
        document.getElementById("root"),
        () => {
          let Preloader = document.getElementById("preloader");
          if (Preloader) Preloader.style.visibility = "hidden";
        }
      );
    });
  } else {
    setTimeout(() => {
      check();
    }, 10);
  }
};

check();
