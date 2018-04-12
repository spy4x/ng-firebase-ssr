// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCpJ5O3yx2NGPuPE0wtc0PHGrM8VFRKJig',
    authDomain: 'sp-ng-blog.firebaseapp.com',
    databaseURL: 'https://sp-ng-blog.firebaseio.com',
    projectId: 'sp-ng-blog',
    storageBucket: 'sp-ng-blog.appspot.com',
    messagingSenderId: '698665102563'
  }
};
