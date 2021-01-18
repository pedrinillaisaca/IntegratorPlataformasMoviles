// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {//api de la dependencia de login
    apiKey: "AIzaSyBs0qe7ypAEyBsmg28K8DXth1ykERcyFH8",
    authDomain: "integradorups.firebaseapp.com",
    projectId: "integradorups",
    storageBucket: "integradorups.appspot.com",
    messagingSenderId: "698697303573",
    appId: "1:698697303573:web:3ada00a80524e5d739f01c"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
