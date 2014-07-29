'use strict';

/* Directives */

angular.module('memberDirectives', [])
.directive('atMembers', function () {
    return {
      restrict : 'A',
      templateUrl: "views/members.html",
      link : function (scope, element, attrs){
      		
        }    
    };
});