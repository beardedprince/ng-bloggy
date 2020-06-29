// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // path: 'https://ng-bloggy.herokuapp.com/api',
  path: 'http://localhost:3000/api',
  firebase: {
    apiKey: 'AIzaSyB8DCGq_-Yg0LYfMRVz82g9tSHVtF_oss0',
    authDomain: 'ng-auths.firebaseapp.com',
    databaseURL: 'https://ng-auths.firebaseio.com',
    projectId: 'ng-auths',
    storageBucket: 'ng-auths.appspot.com',
    messagingSenderId: '278801335329',
    appId: '1:278801335329:web:7231cca56b923370038f60'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
