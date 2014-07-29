'use strict';

var entryServices = angular.module('entryServices', []);

entryServices.factory('Entry', ['$http', 'API_SERVER', function ($http, API_SERVER) {

  var service = {

    addTeam: function(name) {
      return $http.post('http://' + API_SERVER + '/teams', {team: {name: name}})
    },

    updateTeam: function(name) {
      return $http.post('http://' + API_SERVER + '/teams', {team: {name: name}})
    },

    addMember: function(name, team) {
      return $http.post('http://' + API_SERVER + '/members', {member: {name: name, team_id: team}})
    },

    deleteMember: function(id) {
      return $http.delete('http://' + API_SERVER + '/members/' + id)
    }


  };

  return service;
}])
