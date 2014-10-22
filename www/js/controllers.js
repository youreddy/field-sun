angular.module('starter.controllers', [])

.controller('EntryCtrl', function($scope, $state) {
  
    $scope.signIn = function(user) {
      $state.go('app.profile');
      
    };
})
