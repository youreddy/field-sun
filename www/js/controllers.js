angular.module('starter.controllers', [])

// .controller('EntryCtrl', function($scope, $state) {
  
//     $scope.signIn = function(user) {
//       $state.go('app.profile');
      
//     };
// })

.controller('CompanyCtrl', function($scope, $state) {
  
    $scope.signInCompany = function(user) {
      $state.go('app.profile');
      
    };
})

.controller('EntryCtrl', function($scope, auth, $state, store) {
  auth.signin({
    popup: true,
    // Make the widget non closeable
    standalone: true,
    // This asks for the refresh token
    // So that the user never has to log in again
    authParams: {
      scope: 'openid offline_access'
    }
  }, function(profile, idToken, accessToken, state, refreshToken) {
    store.set('profile', profile);
    store.set('token', idToken);
    store.set('refreshToken', refreshToken);
    $state.go('app.profile');
  }, function(error) {
    console.log("There was an error logging in", error);
  });
})