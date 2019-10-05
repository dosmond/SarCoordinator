// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  googleMapsApiKey: '',
  backend: 'http://localhost:4200', // Put your backend here
  firebaseConfig : {
    apiKey: "AIzaSyAikEee3dYc1JrLcL1umiXgaI0MQRpEdiE",
    authDomain: "sar-solutions.firebaseapp.com",
    databaseURL: "https://sar-solutions.firebaseio.com",
    projectId: "sar-solutions",
    storageBucket: "sar-solutions.appspot.com",
    messagingSenderId: "615606149986",
    appId: "1:615606149986:web:8ba0bc245536168ccec23b",
    measurementId: "G-VY44QHQS2F"
  }
};