// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  googleMapsApiKey: '',
  backend: 'http://localhost:4200', // Put your backend here
  firebaseConfig : {
    apiKey: "AIzaSyAHmq5riFJzZXics37k_BiudN_-GC4VuKU",
    authDomain: "dash-pract.firebaseapp.com",
    databaseURL: "https://dash-pract.firebaseio.com",
    projectId: "dash-pract",
    storageBucket: "dash-pract.appspot.com",
    messagingSenderId: "1085542055343",
    appId: "1:1085542055343:web:b4f27b22836c1bf42e035a",
    measurementId: "G-021CBKGB66"
  }
};
