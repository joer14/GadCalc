'use strict';

// MathJax.Hub.Config({
//     skipStartupTypeset: true,
//     messageStyle: "none",
//     "HTML-CSS": {
//         showMathMenu: false
//     }
// });
// MathJax.Hub.Configured();

angular.module('gadCalcApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
