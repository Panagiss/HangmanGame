var randomWords = require('random-words');
var angular = require('angular');

angular.module("myApp", []).controller("myController", function($scope, $timeout) {

    var words = randomWords(50);
    console.log(words);
    var chosenWord;

    $scope.incorrectLetters;
    $scope.correctLetters;
    $scope.tries;
    $scope.displayWord;
    $scope.userInput;

    var choseFunction = () => {
        var i = Math.round(Math.random() * words.length);
        if (i == words.length) {
            i--;
        }
        console.log(i)
        return words[i];
    }

    var startGame = () => {
        $scope.incorrectLetters = [];
        $scope.correctLetters = [];
        $scope.displayWord;
        $scope.tries = 6;


        chosenWord = choseFunction();
        console.log(chosenWord);

        var tmpWord = '';
        for (let index = 0; index < chosenWord.length; index++) {
            tmpWord += '*';
        }
        $scope.displayWord = tmpWord;
    }

    $scope.letterCheck = () => {
        if ($scope.userInput.length > 1) {
            alert("Only 1 letter at a time");
            $scope.userInput = "";
            return;
        } else if ($scope.userInput.length == 0) {
            return;
        }
        for (var i = 0; i < $scope.correctLetters.length; i++) {
            if ($scope.correctLetters[i].toLowerCase() == $scope.userInput.toLowerCase()) {
                $scope.userInput = "";
                alert('Letter already chosen');
                return;
            }
        }
        for (var i = 0; i < $scope.incorrectLetters.length; i++) {
            if ($scope.incorrectLetters[i].toLowerCase() == $scope.userInput.toLowerCase()) {
                $scope.userInput = "";
                alert('Letter already chosen');
                return;
            }
        }
        var flag = false;
        for (let l = 0; l < chosenWord.length; l++) {
            if (chosenWord[l].toLowerCase() == $scope.userInput.toLowerCase()) {
                $scope.displayWord = $scope.displayWord.slice(0, l) + $scope.userInput.toLowerCase() + $scope.displayWord.slice(l + 1);
                flag = true;
            }
        }
        if (flag) {
            $scope.correctLetters.push($scope.userInput.toLowerCase());
        } else {
            $scope.tries--;
            $scope.incorrectLetters.push($scope.userInput.toLowerCase());
        }
        $scope.userInput = "";

        if ($scope.tries == 0) {
            //Lost
            $timeout(() => startGame(), 500);
        }
        if ($scope.displayWord.indexOf("*") == -1) {
            // Won
            $timeout(() => startGame(), 500);
        }

    }
    startGame();

});