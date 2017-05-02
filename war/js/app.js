
var app = angular.module('quizApp');

//App run for all Google authentification
app.run(['GAuth', 'GApi', 'GData', '$rootScope',
 function(GAuth, GApi, GData, $rootScope) { 
	 $rootScope.CLIENT = '333884789234-44phppnv1k7m4oh0cctr9st19m79g9b4.apps.googleusercontent.com';
	 $rootScope.BASE = 'http://1-dot-kiadi-san.appspot.com/_ah/api';

     $rootScope.gdata = GData;
     $rootScope.isLogged = false;

     $rootScope.user_id;
     GAuth.setClient($rootScope.CLIENT);
     
     GAuth.setScope('https://www.googleapis.com/auth/userinfo.email');

     // load the auth api so that it doesn't have to be loaded asynchronously
     // when the user clicks the 'login' button.
     // That would lead to popup blockers blocking the auth window
     GAuth.load();
     
     console.log("loading gapi ...");
     GApi.load('endpoint', 'v1', $rootScope.BASE).then(function(resp) {
         console.log('api: ' + resp.api + ', version: ' + resp.version + ' loaded');
         console.log("GAPI loaded");
     }, function(resp) {
         console.log('an error occured during loading api: ' + resp.api + ', resp.version: ' + version);
     });
     console.log("after loading gapi ...");

     // or just call checkAuth, which in turn does load the oauth api.
     // if you do that, GAuth.load(); is unnecessary
     GAuth.checkAuth().then(
         function (user) {
             console.log(user.name + ' is logged in');
             $rootScope.user = user;
				$rootScope.isLogged = true;
				$rootScope.user_id = user.id;
         },
         function() {
         	console.log('not logged in');
         }
     );
     
     $rootScope.login = function() {
			GAuth.login().then(function(user) {
				$rootScope.user = user;
				$rootScope.isLogged = true;
				$rootScope.user_id = user.id;
			}, function() {
				console.log("Failure to connect");
				alert("Failure to connect, please try later.")
			});
		};

		$rootScope.logout = function() {
			GAuth.logout();
			$rootScope.user = null;
			$rootScope.isLogged = false;
			$rootScope.user_id = null;
		};
 }
]);

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
