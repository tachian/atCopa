'use strict';

var gameServices = angular.module('gameServices', []);

gameServices.factory('Game', ['$http', 'API_SERVER', function ($http, API_SERVER) {

	var service = {

    getGames: function() {
      return $http.get('http://' + API_SERVER + '/tests')
    },

    getGameGuideBasic: function(test_id){
    	return $http.get('http://' + API_SERVER + '/tests/' + test_id + '/test_guide_basics')
    },

    getSimpleQuestionAlternatives: function(question_id){
    	return $http.get('http://' + API_SERVER + '/simple_questions/' + question_id + '/simple_question_alternatives')
    },

	getGroupQuestionStatement: function(group_question_id){
    	return $http.get('http://' + API_SERVER + '/group_questions/' + group_question_id + '/group_question_statements')
    },

    getGroupQuestionAlternative: function(group_question_statement_id){
    	return $http.get('http://' + API_SERVER + '/group_question_statements/' + group_question_statement_id + '/group_question_alternatives')
    },

    getGameGuideAnalysis: function(test_id){
        return $http.get('http://' + API_SERVER + '/tests/' + test_id + '/test_guide_analyses')
    },

    getGameAnalysisScenario: function(test_guide_analyses_id){
        return $http.get('http://' + API_SERVER + '/test_guide_analyses/' + test_guide_analyses_id + '/test_guide_scenarios')
    },

    getGameScenariosAp: function(test_guide_scenario_id){
        return $http.get('http://' + API_SERVER + '/test_guide_scenarios/' + test_guide_scenario_id + '/test_guide_scenario_aps')
    },

    getGameScenariosSa: function(test_guide_scenario_id){
        return $http.get('http://' + API_SERVER + '/test_guide_scenarios/' + test_guide_scenario_id + '/test_guide_scenario_sas')
    }
  };

  return service;

}])