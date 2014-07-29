'use strict';

/* Directives */

angular.module('gameDirectives', [])
.directive('atGame', function () {
    return {
      restrict : 'A',
      templateUrl: "views/game.html",
      link : function (scope, element, attrs){
      		
        }    
    };
})
.directive('atGameFilter', function () {
    return {
      restrict : 'A',
      templateUrl: "views/filter_game.html",
      link : function (scope, element, attrs){
      		
        }    
    };
})
.directive('atGameBasic', function () {
    return {
      restrict : 'A',
      templateUrl: "views/basic_game.html",
      link : function (scope, element, attrs){
      		
        }    
    };
})
.directive('atGameSimpleQuestion', function () {
    return {
      restrict : 'A',
      templateUrl: "views/game_simple_question.html",
      link : function (scope, element, attrs){

      }    
    };
})
.directive('atGameGroupQuestion', function () {
    return {
      restrict : 'A',
      templateUrl: "views/game_group_question.html",
      link : function (scope, element, attrs){
      		
        }    
    };
})
.directive('atGameMessage', function () {
    return {
      restrict : 'A',
      templateUrl: "views/game_message.html",
      link : function (scope, element, attrs){
      		
        }    
    };
})
.directive('atGameInstructionAnalysis', function () {
    return {
      restrict : 'A',
      templateUrl: "views/game_instruction_analysis.html",
      link : function (scope, element, attrs){
          
        }    
    };
})
.directive('atGameAnalysis', function () {
    return {
      restrict : 'A',
      templateUrl: "views/analysis_game.html",
      link : function (scope, element, attrs){
          
        }    
    };
})
.directive('atGetPdvs', function () {
    return {
      restrict : 'A',
      templateUrl: "views/game_analyses_filter_pdv.html",
      link : function (scope, element, attrs){
          
        }    
    };
})
.directive('atShowPdv', function () {
    return {
      restrict : 'A',
      templateUrl: "views/game_analyses_show_pdv.html",
      link : function (scope, element, attrs){
          
        }    
    };
})
.directive('atShowActionPlan', function () {
    return {
      restrict : 'A',
      templateUrl: "views/game_analyses_action_plan.html",
      link : function (scope, element, attrs){
          
        }    
    };
})
.directive('atShowScenarioAnalyses', function () {
    return {
      restrict : 'A',
      templateUrl: "views/game_analyses_scenario.html",
      link : function (scope, element, attrs){
          
        }    
    };
});
