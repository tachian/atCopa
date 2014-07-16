'use strict';

/* Directives */

angular.module('teamDirectives', [])
.directive('atTeam', function () {
    return {
      restrict : 'A',
      templateUrl: "views/team.html",
      link : function (scope, element, attrs){

        }    
    };
});