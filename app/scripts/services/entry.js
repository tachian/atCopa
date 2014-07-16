'use strict';

var entryServices = angular.module('entryServices', []);

entryServices.factory('Entry', ['$http', 'API_SERVER', function ($http, API_SERVER) {

  var service = {

    team: function(name) {
      return $http.post('http://' + API_SERVER + '/teams', {team: {name: name}})
      .success(
        function (data) {
          return data;
        }
      )
      .error(
        function (data) {
          alert('Ocorreu um erro ao efetuar o cadastro. Favor entrar em contato com suporte.');
        }
      );
    }
  };

  return service;
}])
