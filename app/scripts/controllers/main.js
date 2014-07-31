'use strict';

var mainControllers = angular.module('mainControllers', []);

mainControllers.controller('MainCtrl', ['$scope', 'Entry', 'Game', '$filter', '$timeout',
	function ($scope, Entry, Game, $filter, $timeout) {

		$scope.level= 0;
    $scope.gameLevel = 0;
    $scope.team_msg = "Cadastrar";
    $scope.ImageQuestionMessage = "Ver imagem";

    var mensagem_erro = 'Ocorreu um erro. Favor entrar em contato com suporte.';

    var myCountDown;

    var countdown = function(){
      if ($scope.count > 0){
        $scope.count -= 1; 
        myCountDown = $timeout(countdown, 1000); 
      }
      else
      {
        alert("O tempo terminou.");
        correctionGame();
      }
    }

    var correctionGame = function(){
      $scope.level= 4;
    }

    $scope.showLevel = function(level){

      if(level >= 2 && !$scope.team){
        alert('Você precisa infomar o nome do seu time.');
      }
      else if(level >= 3 && $scope.members.length == 0)
      {
        alert('Você precisa informar pelo menos 1 jogador.');
      }
      else
      {
        $scope.level = level;  
      }
    }

    $scope.startGame = function(){
    	$scope.team = null;
      $scope.members = [];
    	$scope.level= 1;
    }

    $scope.registerTeam = function(){
      if($scope.team){
        Entry.updateTeam($scope.team.name)
        .success(
          function (data) {
            $scope.team = data;
            $scope.level = 2;
            $scope.team_msg = "Atualizar";
          }
        )
        .error(function () { alert(mensagem_erro);});
      }
      else
      {
      	Entry.addTeam($scope.team.name)
        .success(
          function (data) {
            $scope.team = data;
            $scope.level = 2;
          }
        )
        .error(function () { alert(mensagem_erro);});
      }
    }

    $scope.registerMember = function(){
      Entry.addMember($scope.newMember, $scope.team.id)
      .success(
        function (data) {
          $scope.members.push(data);
          $scope.newMember = "";
        }
      )
      .error(function () { alert(mensagem_erro);});
    }

    $scope.removeMember = function(start){
      Entry.deleteMember($scope.members[start].id)
      .success(
        function (data) {
          $scope.members.splice(start, 1);
        }
      )
      .error(function () { alert(mensagem_erro);});      
    }

    $scope.startPlay = function(){
      $scope.level= 3;

      Game.getGames()
      .success( 
        function (data){
          $scope.tests = data.tests;
          $scope.gameLevel = 1;
        }
      )
      .error(function () {alert(mensagem_erro);})
    }

    $scope.filterTest = function(){
      $scope.game = $scope.tests.filter(function(test){return test.id == $scope.game.id})[0];

      $scope.count = $scope.game.duration;
      myCountDown = $timeout(countdown, 1000);

      Game.getGameGuideBasic($scope.game.id)
      .success(
        function (data){
          angular.forEach(data.test_guide_basics, function (teste_guide_basic){
            //Simple Question
            if(teste_guide_basic.test_type.id == 1){
              Game.getSimpleQuestionAlternatives(teste_guide_basic.simple_question.id)
              .success(
                function (data){
                  teste_guide_basic.simple_question.alternatives = data.simple_question_alternatives;
                  teste_guide_basic.simple_question.number_corrects = data.simple_question_alternatives.filter(function(sqa){return sqa.correct}).length;
                })
              .error(function () {alert(mensagem_erro);})
            }
            //Group Question
            if(teste_guide_basic.test_type.id == 2){
              Game.getGroupQuestionStatement(teste_guide_basic.group_question.id)
              .success(
                function (data){
                  angular.forEach(data.group_question_statements, function (group_question_statement){
                    //Alternatives Group Questions
                    Game.getGroupQuestionAlternative(group_question_statement.id)
                    .success(
                      function (data){
                        group_question_statement.alternatives = data.group_question_alternatives;
                        group_question_statement.number_corrects = data.group_question_alternatives.filter(function(el){return el.correct}).length;
                      })
                    .error(function () {alert(mensagem_erro);})
                  })
                  teste_guide_basic.group_question.statements = data.group_question_statements;
                })
              .error(function () {alert(mensagem_erro);})
            }

          })

          $scope.testGuideBasic = data.test_guide_basics;
          $scope.gameLevel = 2;
          $scope.currentQuestion = 0;
          $scope.textBasicButton = "Continuar";     
        }
      )
      .error(function () {alert(mensagem_erro);})
    }

    $scope.nextStepBasic = function(){
      $scope.currentQuestion += 1;

      if(($scope.currentQuestion+1) == $scope.testGuideBasic.length){
        $scope.textBasicButton = "Ir para análise de cenários";
      }
      

      if($scope.currentQuestion == $scope.testGuideBasic.length ){
        $scope.gameLevel = 3;
      }
    }

    $scope.startAnalysis = function(){
      $scope.gameLevel = 4;

      Game.getGameGuideAnalysis($scope.tests[0].id)
      .success( 
        function (data){
          angular.forEach(data.test_guide_analyses, function (test_guide_analysis){

            Game.getGameAnalysisScenario(test_guide_analysis.id)
            .success(
              function(data){
            
                angular.forEach(data.test_guide_scenarios, function (test_guide_scenario){
                  Game.getGameScenariosAp(test_guide_scenario.id)
                  .success(
                    function(data){
                      if(data.test_guide_scenario_ap){
                        if(data.test_guide_scenario_ap.group_question){
                          Game.getGroupQuestionStatement(data.test_guide_scenario_ap.group_question.id)
                          .success(
                            function (data){
                              angular.forEach(data.group_question_statements, function (group_question_statement){
                                //Alternatives Group Questions
                                Game.getGroupQuestionAlternative(group_question_statement.id)
                                .success(
                                  function (data){
                                    group_question_statement.alternatives = data.group_question_alternatives;
                                    group_question_statement.number_corrects = data.group_question_alternatives.filter(function(el){return el.correct}).length;
                                  })
                                .error(function () {alert(mensagem_erro);})
                              })
                              test_guide_scenario.ap.group_question.statements = data.group_question_statements;
                            })
                          .error(function () {alert(mensagem_erro);})
                        }
                        else
                        {
                          Game.getSimpleQuestionAlternatives(data.test_guide_scenario_ap.simple_question.id)
                          .success(
                            function (data){
                              test_guide_scenario.ap.simple_question.alternatives = data.simple_question_alternatives;
                              test_guide_scenario.ap.simple_question.number_corrects = data.simple_question_alternatives.filter(function(sqa){return sqa.correct}).length;
                            })
                          .error(function () {alert(mensagem_erro);})
                        }                        
                      }
                      test_guide_scenario.ap = data.test_guide_scenario_ap;
                    })
                  .error(function () {alert(mensagem_erro);})
                  Game.getGameScenariosSa(test_guide_scenario.id)
                  .success(
                    function(data){
                      if(data.test_guide_scenario_sa){
                        if(data.test_guide_scenario_sa.group_question){
                          Game.getGroupQuestionStatement(data.test_guide_scenario_sa.group_question.id)
                          .success(
                            function (data){
                              angular.forEach(data.group_question_statements, function (group_question_statement){
                                //Alternatives Group Questions
                                Game.getGroupQuestionAlternative(group_question_statement.id)
                                .success(
                                  function (data){
                                    group_question_statement.alternatives = data.group_question_alternatives;
                                    group_question_statement.number_corrects = data.group_question_alternatives.filter(function(el){return el.correct}).length;
                                  })
                                .error(function () {alert(mensagem_erro);})
                              })
                              test_guide_scenario.sa.group_question.statements = data.group_question_statements;
                            })
                          .error(function () {alert(mensagem_erro);})
                        }
                        else
                        {
                          Game.getSimpleQuestionAlternatives(data.test_guide_scenario_sa.simple_question.id)
                          .success(
                            function (data){
                              test_guide_scenario.sa.simple_question.alternatives = data.simple_question_alternatives;
                              test_guide_scenario.sa.simple_question.number_corrects = data.simple_question_alternatives.filter(function(sqa){return sqa.correct}).length;
                            })
                          .error(function () {alert(mensagem_erro);})
                        }                        
                      }

                      test_guide_scenario.sa = data.test_guide_scenario_sa;

                    })
                  .error(function () {alert(mensagem_erro);})
                })

            
                test_guide_analysis.scenarios = data.test_guide_scenarios;
              })
            .error(function () {alert(mensagem_erro);});
          })
          $scope.testGuideAnalyses = data.test_guide_analyses;
          $scope.gameAnalysesLevel = 1;
        }
      )
      .error(function () {alert(mensagem_erro);})

    }

    $scope.showPdv = function(analysis){
      $scope.pdv = analysis;
      $scope.gameAnalysesLevel = 2;
      $scope.currentScenario = 0;
    }

    $scope.showAnalysis = function(data){
      $scope.gameAnalysesLevel = data;
    }

    $scope.backPdv = function(){
      $scope.gameAnalysesLevel = 2;
      $scope.currentScenario = 0;
    }

    $scope.backAnalysis = function(){
      $scope.gameAnalysesLevel = 1;
    }

    $scope.nextScenario = function(){
      if($scope.currentScenario < ($scope.pdv.scenarios.length -1)){
        $scope.currentScenario += 1;
      }
    }

    $scope.previousScenario = function(){
      if($scope.currentScenario>0){
        $scope.currentScenario -= 1;  
      }
    }

    $scope.finishGame = function(){
      $timeout.cancel(myCountDown);
      correctionGame();
    }

    $scope.showImage = function(imageQuestion){
      if($scope.imageQuestion){
        $scope.imageQuestion = false;
        $scope.ImageQuestionMessage = "Ver imagem";
      }
      else
      {
        $scope.imageQuestion = true;
        $scope.ImageQuestionMessage = "Esconder imagem";  
      }
      
    }

  }
]);
