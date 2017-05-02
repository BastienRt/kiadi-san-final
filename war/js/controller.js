var app = angular.module('quizApp', []);

app.controller('app', function($scope) {
	  $scope.name = 'Worldd';
	});

app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template/template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function() {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.content;
					scope.answer = q.author;
					scope.falseAuthor1 = q.falseAuthor1;
					scope.falseAuthor2 = q.falseAuthor2;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};
			scope.checkAnswer = function() {
				if(!$("input[name='answer']:checked").length) return;

				var ans = $("input[name='answer']:checked").val();

				if(ans == scope.answer) {
					scope.score++;
					scope.correctAns = true;
				} else {
					scope.correctAns = false;
				}
				scope.answerMode = false;
			};

			scope.nextQuestion = function() {
				scope.id++;
				scope.getQuestion();
			}

			scope.reset();
		}
	}
});


app.factory('quizFactory', function() {
    var questions = [
      {
      author : 'Jean-Michel',
      category : "Bidon",
      content :'Make America great again', 
      date : '2017-01-24',
      falseAuthor1 : 'Essai',
      falseAuthor2 : 'Essai2'
    }, {
      author : 'Marion Maréchall Lepeine',
      category : "Bidon2",
      content :'Les oiseaux gazouillent',
      date : '2017-01-24',
      falseAuthor1 : 'Essai3',
      falseAuthor2 : 'Essai4'
    }];
    
    return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
  }
});