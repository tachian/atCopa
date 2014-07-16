'use strict';

/**
 * @ngdoc overview
 * @name atcopaApp
 * @description
 * # atcopaApp
 *
 * Main module of the application.
 */
var atCopaApp = angular.module('atcopaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'appConfig',
    'mainControllers',
    'teamDirectives',
    'authServices',
    'entryServices'
  ]);

atCopaApp.config(['$routeProvider', 
  function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);


// atCopaApp.run(['$http', 'TokenHandler', 'AuthCallbacks', function ($http, TokenHandler, AuthCallbacks) {

//   // Initialize authorization token
//   if(!TokenHandler.get()) {
//     $http.post('/oauth/authorize', {}, {ignoreAuthModule: true}).success(
//       function (data) {
//         TokenHandler.set(data.access_token);
//         AuthCallbacks.authConfirmed();
//       }
//     ).error(
//       function (data) {
//         TokenHandler.set(false);
//         AuthCallbacks.authCancelled(data.error);
//       }
//     );
//   } else {
//     authCallbacks.authConfirmed();
//   }
// }]);

atCopaApp.run(['$rootScope', '$location', '$http', 'TokenHandler', 'AuthCallbacks', 'MetaData', function ($rootScope, $location, $http, TokenHandler, AuthCallbacks, MetaData) {

  // Initialize authorization token
  if(!TokenHandler.get()) {
    $http.post('/oauth/authorize', {}, {ignoreAuthModule: true}).success(
      function (data) {
        TokenHandler.set(data.access_token);
        AuthCallbacks.authConfirmed();
      }
    ).error(
      function (data) {
        TokenHandler.set(false);
        AuthCallbacks.authCancelled(data.error);
      }
    );
  } else {
    authCallbacks.authConfirmed();
  }

  // Get a token from API if client not authorized
  $rootScope.$on('event:auth-token-error',
    function (event, rejection) {
      if(!TokenHandler.get()) {
        $http.post('/oauth/authorize', {}, {ignoreAuthModule: true}).success(
          function (data) {
            TokenHandler.set(data.access_token);
            AuthCallbacks.authConfirmed();
          }
        ).error(
          function (data) {
            TokenHandler.set(false);
            AuthCallbacks.authCancelled(data.error);
          }
        );
      } else {
        AuthCallbacks.authConfirmed();
      }
    }
  );

  // Initialize metadata
  $rootScope.metadata = {
    'mainTitle': 'Veduca - Assista aos melhores cursos universitários do mundo, em português!',
    'title': 'Veduca',
    'description': 'Os melhores cursos universitários do Brasil e do mundo ao alcance de todos.',
    'og:url': 'http://www.veduca.com.br',
    'og:description': 'Os melhores cursos universitários do Brasil e do mundo ao alcance de todos.',
    'og:title': 'Veduca',
    'og:image': ''
  };

  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
    $rootScope.layout = current.locals.layout;
    $rootScope.metadata = MetaData.read();
    $rootScope.currentPath = $location.path();
  });

  // // Initialize Facebook SDK
  // Facebook.init();
}]);

atCopaApp.factory('MetaData', ['$q', function ($q) {
  return {
    metadata: {
      'mainTitle': 'Veduca - Assista aos melhores cursos universitários do mundo, em português!',
      'title': 'Veduca',
      'description': 'Os melhores cursos universitários do Brasil e do mundo ao alcance de todos.',
      'og:url': 'http://www.veduca.com.br',
      'og:description': 'Os melhores cursos universitários do Brasil e do mundo ao alcance de todos.',
      'og:title': 'Veduca',
      'og:type': 'website',
      'og:image': ''
    },
    load: function(metadata) {
      this.metadata = metadata || this.metadata; // Defaults to main metadata object;
      return this.metadata || $q.when(this.metadata);
    },
    read: function() {
      return this.metadata || $q.when(this.metadata);
    }
  };
}]);