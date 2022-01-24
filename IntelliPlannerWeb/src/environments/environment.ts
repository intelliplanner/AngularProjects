// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseUrlGet: 'https://10.246.76.132/eIdeas/',
  // baseUrlLogin: 'https://10.246.76.132/auth/login',
  baseUrlGet: 'https://api.eideas.nic.in/eIdeas/',
  // baseCaptchaUrl:'http://10.246.76.137/eideascaptcha/',
  // baseCaptchaUrl:'https://10.246.76.136/user/',
  baseCaptchaUrl:'https://manager.eideas.nic.in/user/',
  baseCaptchaVerifyUrl:'http://eideas.nic.in/user/',
  // baseUrlLogin: 'https://api.eideas.nic.in/auth/login',

  baseUrlLogin: 'http://localhost:8092/api/auth/authenticate',
  baseUrlTeachers:'http://localhost:8092/api',

  baseUrlTpr:'http://localhost:8092/api',

  // baseUrlLogin: 'http://103.205.67.245:8082/teacher/auth/login',
  // baseUrlTeachers:'http://103.205.67.245:8082/teacher/reg/auth',

  baseUrlUser: 'https://manager.eideas.nic.in/user/',
  caresURL:'http://eideas.nic.in/cares/#/config/15/'
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
